import * as fs from "fs";
import readline from "readline";
import * as process from "process";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readPackageJson = () => {
  const data = fs.readFileSync("package.json", "utf8");
  return JSON.parse(data);
};

const readAndroidGradle = () => {
  const data = fs.readFileSync("android/app/build.gradle", "utf8");
  return data;
};

const readIOSFile = () => {
  const data = fs.readFileSync("ios/App/App.xcodeproj/project.pbxproj", "utf8");
  return data;
};

const promptUser = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const getAndroidVersionInfo = (gradleData) => {
  //get android version name
  const versionNameLine = gradleData
    .split("\n")
    .find((line) => line.includes("versionName"));
  if (!versionNameLine) {
    throw new Error("Could not find versionName for Android.");
  }
  const androidVersionName = versionNameLine.split('"')[1];

  //get android version code
  const versionCodeLine = gradleData
    .split("\n")
    .find((line) => line.includes("versionCode"));
  if (!versionCodeLine) {
    throw new Error("Could not find versionCode for Android.");
  }
  const androidVersionCode = versionCodeLine.match(/\d+/)[0];
  return { androidVersionName, androidVersionCode };
};

const getIOSVersionInfo = (iosData) => {
  //get ios version name
  const versionNameLine = iosData
    .split("\n")
    .find((line) => line.includes("MARKETING_VERSION"));
  if (!versionNameLine) {
    throw new Error("Could not find versionName for iOS.");
  }
  let iosVersionName = versionNameLine.split("=")[1].trim().replace(";", "");

  //get ios version code
  const versionCodeLine = iosData
    .split("\n")
    .find((line) => line.includes("CURRENT_PROJECT_VERSION"));
  if (!versionCodeLine) {
    throw new Error("Could not find versionCode for iOS.");
  }
  const iosVersionCode = versionCodeLine.match(/\d+/)[0];
  return { iosVersionName, iosVersionCode };
};

const updatePackageVersion = (data) => {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync("package.json", jsonData, "utf8");
};

const updateAndroidVersion = (data) => {
  fs.writeFileSync("android/app/build.gradle", data, "utf8");
};

const updateIosVersion = (data) => {
  fs.writeFileSync("ios/App/App.xcodeproj/project.pbxproj", data, "utf8");
};

const run = async () => {
  const packageData = readPackageJson();
  const androidData = readAndroidGradle();
  const iosData = readIOSFile();

  //get original version info
  const { androidVersionName, androidVersionCode } =
    getAndroidVersionInfo(androidData);
  const { iosVersionName, iosVersionCode } = getIOSVersionInfo(iosData);

  const suggestedVersionCode =
    androidVersionCode > iosVersionCode ? androidVersionCode : iosVersionCode;

  const parsedVersionCode = parseInt(suggestedVersionCode);
  if (Number.isNaN(parsedVersionCode) || !Number.isInteger(parsedVersionCode)) {
    throw new Error(
      `Invalid current version code ${suggestedVersionCode}. It should be a number.`
    );
  }

  // if passed flag '--bump' just increment the suggested version code and use it
  if (process.argv[2] === "--read-build-version") {
    console.log(parsedVersionCode);
    process.exit(0);
  }

  console.log("package.json:", packageData.version);

  console.log("android:", androidVersionName + "+" + androidVersionCode);

  console.log("iOS:", iosVersionName + "+" + iosVersionCode);

  let newVersionName;
  let newVersionCode;
  // if passed flag '--bump' just increment the suggested version code and use it
  if (process.argv[2] === "--bump") {
    const bumpedVersionCode = parseInt(suggestedVersionCode) + 1;
    console.log(
      `Bumping version code from ${suggestedVersionCode} to ${bumpedVersionCode}`
    );
    newVersionName = iosVersionName;
    newVersionCode = bumpedVersionCode;
  } else {
    //input new version name
    newVersionName = await promptUser(
      `Enter new version name (${iosVersionName}): `
    );
    //input new version code
    newVersionCode = await promptUser(
      `Enter new version code(${parseInt(suggestedVersionCode)}): `
    );
  }

  // validate version name
  if (newVersionName == "") {
    newVersionName = iosVersionName;
  } else {
    if (
      !(
        /^\d+\.\d+\.\d+$/.test(newVersionName) ||
        /^\d+\.\d+$/.test(newVersionName)
      )
    ) {
      console.error(
        "Invalid version name format. Expected format is x.y.z or x.y"
      );
      process.exit(1);
    }
  }

  // validate version code
  if (newVersionCode == "") {
    newVersionCode = parseInt(suggestedVersionCode);
  }

  if (isNaN(newVersionCode)) {
    console.error("Invalid version code. It should be a number.");
    process.exit(1);
  }

  if (newVersionCode < parseInt(suggestedVersionCode)) {
    console.error(
      `Invalid version code. It should be bigger than ${parseInt(
        suggestedVersionCode
      )}`
    );
    process.exit(1);
  }

  //package update
  let originPackageVersion = packageData.version;
  let packageVersionParts = originPackageVersion.split("+");
  packageVersionParts[0] = newVersionName;
  packageVersionParts[1] = newVersionCode;
  packageData.version = `${newVersionName}+${newVersionCode}`;

  updatePackageVersion(packageData);

  //android verion update
  let updatedAndroidData = androidData.replace(
    /(versionCode\s)(\d+)/,
    `$1${newVersionCode}`
  );
  updatedAndroidData = updatedAndroidData.replace(
    /(versionName\s")([^"]*)(")/,
    `$1${newVersionName}"`
  );
  updateAndroidVersion(updatedAndroidData);

  //ios versin update
  let updatedIOSData = iosData.replace(
    /(CURRENT_PROJECT_VERSION = )(\d+)(;)/g,
    `$1${newVersionCode}$3`
  );

  updatedIOSData = updatedIOSData.replace(
    /(MARKETING_VERSION = )([^;]*)(;)/g,
    `$1${newVersionName}$3`
  );
  updateIosVersion(updatedIOSData);

  //successful
  console.log(
    `***** Version is successfully updated to [${newVersionName}+${newVersionCode}]`
  );
  process.exit(0);
};

run();
