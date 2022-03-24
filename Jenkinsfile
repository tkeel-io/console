pipeline {
  agent {
    node {
      label 'nodejs'
    }
  }
    parameters {
        string(name:'GITHUB_ACCOUNT',defaultValue: 'lunz1207',description:'helm chart 仓库名')
        string(name:'PLUGIN_NAME',defaultValue: 'console-portal-admin',description:'插件名称')
        string(name:'APP_VERSION',defaultValue: '0.4.2-dev',description:'组件镜像版本')
        string(name:'CHART_VERSION',defaultValue: '0.4.2-dev',description:'组件chart 版本')
    }

    environment {
        // Docker access token,定义在凭证中 
        DOCKER_CREDENTIAL_ID = 'dockerhub-tkeel'
        // GitHub access token,定义在凭证中
        GITHUB_CREDENTIAL_ID = 'github'
        // k8s kubeconfig,定义在凭证中
        KUBECONFIG_CREDENTIAL_ID = 'kubeconfig'
        // Docker 仓库
        REGISTRY = 'docker.io'
        // Docker 空间
        DOCKERHUB_NAMESPACE = 'tkeelio'
        // Github 账号
        // GITHUB_ACCOUNT = 'tkeel-io'
        // 组件名称
        APP_NAME = 'console'
        // please ignore
        CHART_REPO_PATH = '/home/jenkins/agent/workspace/helm-charts'
    }

    stages {
        stage ('checkout scm') {
            steps {
                checkout(scm)
            }
        }
 
        stage ('build & push image') {
            steps {
                container ('nodejs') {
                  sh 'npm install -g n'
                  sh 'n stable'
                  sh 'npm install -g yarn --force'
                  sh 'yarn'
                    withCredentials([usernamePassword(passwordVariable : 'DOCKER_PASSWORD' ,usernameVariable : 'DOCKER_USERNAME' ,credentialsId : "$DOCKER_CREDENTIAL_ID" ,)]) {
                        // sh 'yarn build:production-and-docker:build --package-names=@tkeel/$PLUGIN_NAME --docker-image-tag=$APP_VERSION --docker-image-push=true'
                        sh 'if test $PLUGIN_NAME = all; then yarn build:production-and-docker:build --package-names=all --docker-image-tag=$APP_VERSION --docker-image-push=true ;else yarn build:production-and-docker:build --package-names=@tkeel/$PLUGIN_NAME --docker-image-tag=$APP_VERSION --docker-image-push=true ;fi'
                    }
              }
          }
        }

        stage('build & push chart'){
          steps {
              container ('nodejs') {
                // sh 'cd charts && helm3 package ./$PLUGIN_NAME --app-version=$BRANCH_NAME-$APP_VERSION --version=$CHART_VERSION'
                sh 'if test $PLUGIN_NAME = all; then cd charts && helm3 package ./* --app-version=$BRANCH_NAME-$APP_VERSION --version=$CHART_VERSION ;else cd charts && helm3 package ./$PLUGIN_NAME --app-version=$BRANCH_NAME-$APP_VERSION --version=$CHART_VERSION ;fi'
                // input(id: 'release-image-with-tag', message: 'release image with tag?')
                  withCredentials([usernamePassword(credentialsId: "$GITHUB_CREDENTIAL_ID", passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                    sh 'git config --global user.email "lunz1207@yunify.com"'
                    sh 'git config --global user.name "lunz1207"'
                    sh 'mkdir -p $CHART_REPO_PATH'
                    sh 'git clone https://$GIT_USERNAME:$GIT_PASSWORD@github.com/$GITHUB_ACCOUNT/helm-charts.git $CHART_REPO_PATH'
                    sh 'mv ./charts/*.tgz $CHART_REPO_PATH'
                    sh 'cd $CHART_REPO_PATH && helm3 repo index . --url=https://$GITHUB_ACCOUNT.github.io/helm-charts'
                    sh 'cd $CHART_REPO_PATH && git add . '
                    sh 'cd $CHART_REPO_PATH && git commit -m "feat:update chart"'
                    sh 'cd $CHART_REPO_PATH && git push https://$GIT_USERNAME:$GIT_PASSWORD@github.com/$GITHUB_ACCOUNT/helm-charts.git'
                  }
              }
          }
        }
    }
}