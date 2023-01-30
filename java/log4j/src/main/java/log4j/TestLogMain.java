package log4j;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import otherPackage.SecondTest;

public class TestLogMain {

	private static Logger logger = LogManager.getLogger(TestLogMain.class);

	public static void main(String argsv[]) {
		for (int i = 0; i < 10000; i++) {
			// A ordem do nivel de importancia � TRACE=>DEBUG=>Info=>WARN=>ERROR=>FATAL
			logger.trace("Isto � um teste debug");
			logger.debug("Isto � um teste debug");
			logger.info("Isto � um teste info");
			logger.warn("Isto � um teste debug");
			logger.error("Isto � um teste error");
			logger.fatal("Isto � um teste fatal");
		}
		
		SecondTest.test();
	}

}
