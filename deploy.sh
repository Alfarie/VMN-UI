
BASEDIR=$(dirname "$0")
echo "$BASEDIR"

echo "[Info] Deploy UI"
npm run build --prefix $BASEDIR

DEPLOY_PATH="/Users/alfarie/Documents/Grobot-Project/@Project/VMN/VMN-MPU/Deploy/dist"
if [ ! -d "$DEPLOY_PATH" ]; then  # for file "if [-f /home/rama/file]" 
    echo "[Info] Create dist in VMN MPU Project"
    mkdir $DEPLOY_PATH
    cp -r $BASEDIR/build/** $DEPLOY_PATH
fi
DIST_PATH="/Users/alfarie/Documents/Grobot-Project/@Project/VMN/VMN-MPU/dist"
if [ ! -d "$DIST_PATH" ]; then  # for file "if [-f /home/rama/file]" 
    echo "[Info] Create dist in VMN MPU Project"
    mkdir $DIST_PATH
    cp -r $BASEDIR/build/** $DIST_PATH
fi

echo "[Info] Move Build to dist"
cp -r $BASEDIR/build/** $DEPLOY_PATH
cp -r $BASEDIR/build/** $DIST_PATH