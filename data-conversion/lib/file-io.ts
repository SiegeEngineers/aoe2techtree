import fs, { WriteStream } from 'fs';

export const OUTPUT_DIR = './converted-data';

export let unitsWriteStream: WriteStream;
export let techsWriteStream: WriteStream;
export let buildingsWriteStream: WriteStream;
export let civsWriteStream: WriteStream;

/**
 * Creates the typescript files that will hold all the data and relationships
 * for the different game items.
 *
 * NOTE: This will overwrite whatever is currently in the file.
 *
 * @param writeTo Specify which files to overwrite.
 */
export function openWriteStreams(writeTo: {
  units: boolean;
  techs: boolean;
  buildings: boolean;
  civs: boolean;
}) {
  if (writeTo.units) {
    unitsWriteStream = fs.createWriteStream(`${OUTPUT_DIR}/units.ts`);
    unitsWriteStream.write('export const units: any = ');
  }

  if (writeTo.techs) {
    techsWriteStream = fs.createWriteStream(`${OUTPUT_DIR}/techs.ts`);
    techsWriteStream.write('export const techs: any = ');
  }

  if (writeTo.buildings) {
    buildingsWriteStream = fs.createWriteStream(`${OUTPUT_DIR}/buildings.ts`);
    buildingsWriteStream.write('export const buildings: any = ');
  }

  if (writeTo.civs) {
    civsWriteStream = fs.createWriteStream(`${OUTPUT_DIR}/civs.ts`);
    civsWriteStream.write('export const civs: any = ');
  }
}

/**
 * writes data to stream
 * @param data
 * @param writeStream
 */
export function writeToFile(data: any, writeStream: WriteStream) {
  const jsonString = JSON.stringify(data, null, '');
  writeStream.write(jsonString);
}

/**
 * preps the folders to copy the images into
 */
export function createImageFolders() {
  fs.rmSync(`${OUTPUT_DIR}/images`, { recursive: true, force: true });
  fs.mkdirSync(`${OUTPUT_DIR}/images`);
  fs.mkdirSync(`${OUTPUT_DIR}/images/units`);
  fs.mkdirSync(`${OUTPUT_DIR}/images/techs`);
  fs.mkdirSync(`${OUTPUT_DIR}/images/buildings`);
}

/**
 * This function copies the original image file (which is numbered)
 * and renames it to the in game name of the item.
 *
 * @param id unit/tech/building id, ex:5083
 * @param name its in game name, ex: archer
 * @param srcDir the source directory of the original image file
 */
export function copyImageFile(id: string, name: string, srcDir: string) {
  const imgSrc = `../img/${srcDir}/${id}.png`;

  if (fs.existsSync(imgSrc)) {
    fs.copyFileSync(
      imgSrc,
      `${OUTPUT_DIR}/images/${srcDir.toLowerCase()}/${name}.png`,
    );
  }
}
