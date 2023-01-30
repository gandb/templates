package log4j;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import otherPackage.SecondTest;

public class TestLogMain {

	private static Logger logger = LogManager.getLogger(TestLogMain.class);

	public static void main(String argsv[]) {
		for (int i = 0; i < 10000; i++) {
			// A ordem do nivel de importancia é TRACE=>DEBUG=>Info=>WARN=>ERROR=>FATAL
			logger.trace("Isto é um teste debug");
			logger.debug("Isto é um teste debug");
			logger.info("Isto é um teste info");
			logger.warn("Isto é um teste debug");
			logger.error("Isto é um teste error");
			logger.fatal("Isto é um teste fatal");
		}
		
		SecondTest.test();
	}

}
