<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmg2MnR5Ym10OGkwNTIwdzJkc2dzbXI1NjM2MmtuMGM5eXV3M3A1aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TFOU670rpPHiVIZJNJ/giphy.gif" width="200" style="border-radius:20px;"/>

---
# 3D Protein

### Todo:
- [x] add splash screen with custom logo
- [x] add FingerPrint authentication (_if exists_).
- [x] list ligands from [./constants/ligands.json](./constants/ligands.json)
- [x] search bar to search a specific ligand from the list
- [x] if a ligand is selected (clicked) move to the render page
- [x] setup Three.js in the app
- [x] render in 3d the structure of a protein by fetching the PDB data by ligand
    - [x] fetch ligand PDB data from API
    - [x] parse it
    - [x] render
    - [ ] cache PDB data in the phone's local storage
- [x] add the ability to customize the protein model:
    - [x] zoom
    - [x] rotate
    - [x] screenshot + share
    - [x] model customization
        - [x] update cylinder (color)
        - [x] update Atom (shape + color)
    - [x] reset settings
    - [x] Atom info (display atom's info when clicked)
- [ ] build a `kind of` engine to render a protein from PDB.

### Conclusion:
there will be 4 screens (pages):
1. splash screen
1. home screen
2. Listing screen
3. Render screen 

<div style="display: flex;">
    <img src="./assets/ux.gif" alt="render" width="270" >
    <img src="./assets/ux-2.gif" alt="render" width="270" >
</div>
