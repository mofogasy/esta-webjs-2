// This file tells Jenkins how to build the project. More info is here: https://confluence.sbb.ch/pages/viewpage.action?pageId=854620436
//  Typically you would define an organizational scan so that Jenkins finds this file and executes it.


// loading libraries for common tasks
@Library(['github.com/SchweizerischeBundesbahnen/jenkins-pipeline-helper@master', 'wzu-pipeline-helper']) _

pipeline {
   agent { label 'java' }
   tools {
       maven 'Apache Maven 3.3'
       jdk 'OpenJDK 1.8 64-Bit'
   }


   stages {
    stage('When on develop, deploy snapshot and analyze for sonar') {
      when {
        branch 'develop'
      }
      steps {
        dir('dist') {
          deleteDir()
        }
        dir('reports') {
          deleteDir()
        }
        sh 'npm run build-prod'
      }
    }

    stage('Unit Tests') {
      steps {
         sh 'npm install'
         sh 'npm run test-selenium && npm run e2e-selenium'
         junit '**/reports/*.xml'
         withSonarQubeEnv('Sonar SBB CFF FFS AG') {
            sh 'mvn -B org.jacoco:jacoco-maven-plugin:prepare-agent test -Dsonar.language=ts -Dsonar.profile=TsLint -Dsonar.sources="src/app" -Dsonar.verbose=true -Dsonar.exclusions="**/node_modules/**,**/*.spec.ts,**/*.module.ts,**/*.routes.ts" -Dsonar.test.inclusion="**/*.spec.ts" -Dsonar.ts.tslint.configPath="tslint.json" -Dsonar.ts.coverage.lcovReportPath="reports/coverage/lcov.info"'
            sh 'mvn -B sonar:sonar -Dsonar.branch=$BRANCH_NAME'
         }
      }
    }

    stage('When on master, we create a release & deploy') {
      when {
          branch 'master'
      }
      steps {
        script {
           def releasedPom = releaseMvn()

           // one cannot easily pass variables from one stage to the next, so combining these operations
           buildDockerImageSelfRunningJar(targetOsProject:"putHereYourOpenshiftProjectThatHoldsImages", pomVersion: releasedPom.version)
        }
      }
    }
  }
}