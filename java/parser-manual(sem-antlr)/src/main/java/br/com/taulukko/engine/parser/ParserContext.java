package br.com.taulukko.engine.parser;

import com.taulukko.engine.parser.utils.ExceptionUtils;

import br.com.taulukko.engine.parser.i18n.I18N;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@AllArgsConstructor
public class ParserContext {
	@Getter
	private String command;
	@Getter
	@Setter
	private String error;
	@Getter
	private int index;
	@Getter
	private I18N i18n;
	@Builder.Default
	private ExceptionUtils errutils = new ExceptionUtils();

	public ParserContext(String lang, String command) {
		this.i18n = new I18N(lang);
		this.command = command;
		this.index = 0;
		this.error = null;
		this.errutils = new ExceptionUtils();

	}

	public ParserContext clone() {
		return ParserContext.builder().command(this.command).i18n(this.i18n).error(this.error).index(this.index)
				.build();
	}
	
	public boolean isEOF()
	{
		return this.index == this.command.length();
	}
	
	public boolean isSOF()
	{
		return this.index ==0;
	}
	
	public void setIndex(int index)
	{  
		this.errutils.asserts(  this.command!=null, "Command cannot be null ");
		this.errutils.asserts(index<=this.command.length(), "Index need be < command.length ");
		this.index = index;
	}
}
