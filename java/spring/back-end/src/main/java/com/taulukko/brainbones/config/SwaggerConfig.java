package com.taulukko.brainbones.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.Contact;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
	
	@Bean
	public Docket docker() {
		return new Docket(DocumentationType.SWAGGER_2).useDefaultResponseMessages(false)
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.taulukko.brainbones"))
				.paths(PathSelectors.any())
				.build()
				.apiInfo(apiInfo())
				.securityContexts( securityContext())
				.securitySchemes(securitySchemes());
	}
	
	private ApiInfo apiInfo() {
		return new ApiInfoBuilder()
				.title("Brain and Bones")
				.description("Brain and Bones API")
				.version("1.0")
				.contact(contact())
				.build();
	}
	
	private List<SecurityContext> securityContext() {
		SecurityContext securityContext = SecurityContext.builder().securityReferences(securityReference())
				.forPaths(PathSelectors.any()).build();
		List<SecurityContext> securityContexts = new ArrayList<SecurityContext>();
		securityContexts.add(securityContext);
		return securityContexts;
	}
	
	
	private List<ApiKey> securitySchemes() {
		ApiKey apiKey = new ApiKey("JWT", "Authorization", "header");
		List<ApiKey> apiKeys = new ArrayList<ApiKey>();
		apiKeys.add(apiKey);
		return apiKeys;
	}

	private List<SecurityReference> securityReference()
	{
		AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
		AuthorizationScope scopes [] = new AuthorizationScope[1];
		scopes[0] = authorizationScope;
		
		SecurityReference securityReference = new SecurityReference("JWT",scopes);
		List<SecurityReference> references = new ArrayList<SecurityReference>();
		references.add(securityReference);
		return references;
	}
	
	private Contact contact() {
		return new Contact("Edson Vicente Carli Junior", "www.taulukko.com.br","taulukko@taulukko.com.br");
	}
}
