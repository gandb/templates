package otherPackage;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class SecondTest {

	private static Logger logger = LogManager.getLogger(SecondTest.class);

	public static void test() {

		// A ordem do nivel de importancia � TRACE=>DEBUG=>Info=>WARN=>ERROR=>FATAL
		logger.trace("Isto � um teste 2 trace");
		logger.debug("Isto � um teste 2 debug");
		logger.info("Isto � um teste 2 info");
		logger.warn("Isto � um teste 2 debug");
		logger.error("Isto � um teste 2 error");
		logger.fatal("Isto � um teste 2 fatal");

	}

}
