package com.taulukko.brainbones.services;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.taulukko.brainbones.domain.entity.Account;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JWTService {
	
	public static final String KEY_EMAIL = "email";
	public static final String KEY_USERNAME = "username";
	public static final String KEY_ACCESSLEVEL = "accesslevel";

	@Value("${security.jwt.expiration}")
	private String expiration;
	@Value("${security.jwt.key}")
	private String key;

	public String buildToken(Account account) {
		long expiration = Long.parseLong(this.expiration);
		LocalDateTime localDateTimeExpiration = LocalDateTime.now().plusMinutes(expiration);
		Instant instantOfExpiration = localDateTimeExpiration.atZone(ZoneOffset.systemDefault()).toInstant();
		Date dateOfExpiration = Date.from(instantOfExpiration);

		Map<String, Object> claims = new HashMap<>();

		claims.put(KEY_EMAIL, account.getEmail());
		claims.put(KEY_USERNAME, account.getUsername());
		claims.put(KEY_ACCESSLEVEL, account.getAccesslevel());

		return Jwts.builder().setClaims(claims).setSubject(account.getId()).setExpiration(dateOfExpiration)
				.signWith(SignatureAlgorithm.HS512, key).compact();

	}

	public Claims tokenToClaims(String token) {
		return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
	}

	public boolean isValid(String token) {
		try {
			Claims claims = tokenToClaims(token);
			Date expirationDate = claims.getExpiration();
			LocalDateTime expiration = expirationDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

			return expiration.isAfter(LocalDateTime.now());
		} catch (Exception e) {
			return false;
		}
	}

	@SuppressWarnings("unchecked")
	public <T> T getValue(String key,String token) {
		Claims claims = tokenToClaims(token);
		return (T) claims.get(key);

	}

}
