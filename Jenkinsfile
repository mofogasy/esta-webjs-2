// This file tells Jenkins how to build the project. More info is here: https://confluence.sbb.ch/pages/viewpage.action?pageId=854620436
//  Typically you would define an organizational scan so that Jenkins finds this file and executes it.


// loading libraries for common tasks
@Library(['github.com/SchweizerischeBundesbahnen/jenkins-pipeline-helper@master', 'wzu-pipeline-helper']) _

String cron_string = BRANCH_NAME == "develop" ? "@midnight" : ""

pipeline {
   agent { label 'nodejs' }

   triggers { cron(cron_string) }

   tools {
       maven 'Apache Maven 3.3'
       jdk 'OpenJDK 1.8 64-Bit'
   }

   stages {

    stage('Prepare') {
         sh 'npm install'
         sh 'npm run clean'
         sh 'npm run lint'
    }

    stage('Unit Tests') {
      steps {
         sh 'npm run test-selenium'
         // Use this as soon as you have adjusted environment.e2e.ts with your authconfig
         // sh 'npm run test-selenium && npm run e2e-selenium'
         junit '**/reports/*.xml'
         withSonarQubeEnv('Sonar SBB CFF FFS AG') {
                               sh 'mvn -B org.jacoco:jacoco-maven-plugin:prepare-agent test'
                               // the argument -Dsonar.branch=$BRANCH_NAME' is optional
                               sh 'mvn -B sonar:sonar -Dsonar.branch=$BRANCH_NAME'
         }
      }
    }

    stage('When on develop, deploy snapshot and analyze for sonar') {
      when {
        branch 'develop'
      }
      steps {
        sh 'npm run build-prod-ci'
        sh 'mvn -B validate deploy -Dnexus_release_url=REPLACE_WITH_RELEASE_URL -Dnexus_snapshot_url=REPLACE_WITH_SNAPSHOT_URL'
      }
    }

    stage('When on master, we create a release & deploy') {
      when {
          branch 'master'
      }
      steps 
        sh 'npm run build-prod-ci'
        script {
           def releasedPom = releaseMvn()

           // one cannot easily pass variables from one stage to the next, so combining these operations
           buildDockerImage(targetOsProject:"REPLACE_WITH_OS_BUILD_PROJECT", baseImageNamespace: "REPLACE_WITH_BASE_IMAGE", baseImageNameAndTag: "plattform-nginx:1.12.2-01",
            tag: "latest", ocAppVersion: releasedPom.version)
        }
      }
    }
  }
