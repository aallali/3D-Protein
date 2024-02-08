
const PROTEIN_MODEL_API = (ligand: string) => `https://files.rcsb.org/ligands/${ligand[0]}/${ligand}/${ligand}_model.pdb`;

export function fetchProteinModel(ligand: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const pdbUrl = PROTEIN_MODEL_API(ligand)
        console.log(pdbUrl)
        const resp = await fetch(pdbUrl);
   
        if (resp.status !== 200) {
          throw `cannot load this ligand's model, please try again or check official website status: ${pdbUrl}`
        }
        const data = await resp.text();
        console.log(data)
        const pdbObj = { atoms: [] }
        const atoms = pdbObj.atoms
  
        let connectors = data.match(/^CONECT(:?\s*\d+.+)+/gm)?.map(l => [...l.match(/(:?\d+s*)/gm) || []].map(l => parseFloat(l)));
  
        resolve({ atoms: [], connectors: [] })
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }
  