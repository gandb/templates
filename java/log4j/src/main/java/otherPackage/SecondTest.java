package otherPackage;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class SecondTest {

	private static Logger logger = LogManager.getLogger(SecondTest.class);

	public static void test() {

		// A ordem do nivel de importancia é TRACE=>DEBUG=>Info=>WARN=>ERROR=>FATAL
		logger.trace("Isto é um teste 2 trace");
		logger.debug("Isto é um teste 2 debug");
		logger.info("Isto é um teste 2 info");
		logger.warn("Isto é um teste 2 debug");
		logger.error("Isto é um teste 2 error");
		logger.fatal("Isto é um teste 2 fatal");

	}

}
