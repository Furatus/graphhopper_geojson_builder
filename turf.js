import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { lineOffset, lineString, featureCollection, polygon } from "@turf/turf";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function convertLineStringToPolygon(inputFilePath, outputFilePath) {
    const linestringData = fs.readFileSync(inputFilePath, { encoding: 'utf8', flag: 'r' });

    const features = featureCollection(JSON.parse(linestringData).features);
    const linestring = lineString(features.features[0].geometry.coordinates);
    //console.log(JSON.stringify(linestring));
    const offsetLine = lineOffset(linestring, 4, { units: 'meters' });
    const offsetReverseLine = lineOffset(linestring, -4, { units: 'meters' });

    const combinedCoordinates = [
        ...offsetReverseLine.geometry.coordinates,
        ...offsetLine.geometry.coordinates.reverse()
    ];
    console.log(JSON.stringify(offsetLine));
    /*const poly = lineToPolygon(linestring);
    fs.writeFileSync(outputFilePath, JSON.stringify(poly, null, 2), 'utf8');*/
    combinedCoordinates.push(combinedCoordinates[0]);

    const poly = polygon([combinedCoordinates]);

    fs.writeFileSync(outputFilePath, JSON.stringify(poly, null, 2), 'utf8');


}

const inputFile = path.join(__dirname, 'linestring.geojson');
const outputFile = path.join(__dirname, 'polygon.geojson');

convertLineStringToPolygon(inputFile, outputFile);