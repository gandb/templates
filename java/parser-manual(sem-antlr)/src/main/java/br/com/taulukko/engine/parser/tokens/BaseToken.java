package br.com.taulukko.engine.parser.tokens;

import java.util.ArrayList;
import java.util.List;

import com.taulukko.engine.parser.utils.ExceptionUtils;

import br.com.taulukko.engine.parser.ParserContext;
import lombok.Data;

@Data
public abstract class BaseToken {

	private int start;
	private int end;
	private String text;
	private TokenType type;
	private List<BaseToken> children;

	public BaseToken(TokenType type) {
		this.type = type;
		this.children = new ArrayList<BaseToken>();
	}

	public boolean is(ParserContext context ) {
		ExceptionUtils exceptionUtils = new ExceptionUtils();
		exceptionUtils.asserts(start < context.getCommand().length(),
				"start need be < command length");
		exceptionUtils.asserts(start >= 0, "start need be >= 0 ");

		return this.parse(context);

	}

	public void sucessUpdate(ParserContext context, int end, List<BaseToken> children) {
		int start = context.getIndex();
		String content = context.getCommand().substring(start, end);
		this.setStart(start);
		this.setEnd(end);
		this.setText(content);
		this.setChildren(children);
		context.setIndex(end + 1);
		context.setError(null);
	}

	public void sucessUpdate(ParserContext context, int end) {
		this.sucessUpdate(context, end, new ArrayList<BaseToken>());
	}

	abstract boolean parse(ParserContext context );
}
