import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

class graphhopperData {
    constructor() {
        this.priority = [];
        this.areas = {};
    }
}

// Fonction pour ajouter des IDs uniques à chaque zone dans le fichier GeoJSON
function addIdsToGeoJSON(inputFilePath, outputFilePath) {
  // Lire le fichier JSON/GeoJSON d'entrée
  fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur de lecture du fichier:', err);
      return;
    }

    // Parser le contenu JSON
    let geojsonData;
    try {
      geojsonData = JSON.parse(data);
    } catch (e) {
      console.error('Erreur de parsing du fichier JSON:', e);
      return;
    }

    // Vérification si le fichier contient des "features"
    if (!geojsonData.features || !Array.isArray(geojsonData.features)) {
      console.error("Le fichier GeoJSON ne contient pas de 'features'.");
      return;
    }

    let ghData = new graphhopperData();

    // Ajouter un ID unique pour chaque feature
    geojsonData.features.forEach((feature) => {
      const newId = uuidv4().replace(/-/g, ''); // Générer un UUID
      feature.id = newId; // Ajouter l'ID unique
      ghData.priority.push({"if" : `in_${newId}`, "multiply_by" : `${Math.random().toFixed(2)}`}); // ajouter l'id à a liste
    });

    ghData.areas = geojsonData;

    // Sauvegarder les modifications dans un fichier de sortie
    fs.writeFile(outputFilePath, JSON.stringify(ghData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Erreur lors de la sauvegarde du fichier:', err);
      } else {
        console.log(`Fichier avec IDs uniques sauvegardé à: ${outputFilePath}`);
      }
    });
  });
}

// Utilisation de la fonction avec un fichier d'entrée et un fichier de sortie
const inputFile = path.join(__dirname, 'input.geojson'); // Remplacer par ton fichier d'entrée
const outputFile = path.join(__dirname, 'output_with_ids.geojson'); // Remplacer par ton fichier de sortie

addIdsToGeoJSON(inputFile, outputFile);
