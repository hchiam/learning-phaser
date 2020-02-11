folderToUse=dist
surgePageToPublishTo=https://hchiam-phaser-test.surge.sh

function installSurgeIfMissing() {
  if ! [ -x "$(command -v surge)" ]; then
    npm install -g surge
  fi
}

function publishToSurge() {
  surge $folderToUse $surgePageToPublishTo
}

function openInChrome() {
  open -na "Google Chrome" --args -incognito $surgePageToPublishTo
}

installSurgeIfMissing

read -p "Use default $folderToUse folder? " useDefaultFolder

# keep asking until given a response
while [ -z "$useDefaultFolder" ]; do
  read -p "Use default $folderToUse folder? " useDefaultFolder
done

re='(y|Y)(es|up|eah)?'
if [[ $useDefaultFolder =~ $re ]]; then
  echo "I'll take that as a yes. :)"
  echo "Publishing to $surgePageToPublishTo"
  publishToSurge
  openInChrome
else
  echo "I'll take that as a no. :)"
  read -p "What folder to use? " folderToUse
  read -p "What surge.sh page to publish to? " surgePageToPublishTo
  publishToSurge
  openInChrome
fi

# This file was first created using the Yeoman generator
# generator-hchiam-learning:
# https://www.npmjs.com/package/generator-hchiam-learning
