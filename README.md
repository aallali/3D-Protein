<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmg2MnR5Ym10OGkwNTIwdzJkc2dzbXI1NjM2MmtuMGM5eXV3M3A1aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TFOU670rpPHiVIZJNJ/giphy.gif" width="480" height="480" style="border-radius:20px;"/>

---
# 3D Protein

### Todo:
- [x] add splash screen with custom logo
- [ ] add FingerPrint authentication.
- [x] list ligands from [./constants/ligands.json](./constants/ligands.json)
- [x] search bar to search a specefic ligand from list
- [x] if a ligand is selected (clicked) move to render page
- [x] setup Three.js in the app
- [ ] render in 3d the structure of protein by fetching the PDB data by ligand
    - [x] fetch ligand PDB data from api
    - [ ] parse it
    - [ ] render
- [ ] build `kind of` an engine to render parser Pdb data

### Conclusion:
there will be 4 screens (pages):
1. splash screen
1. home screen
2. Listing screen
3. Render screen 

<div style="display: flex;">
    <img src="./assets/screenshot-splash.jpeg" alt="First Screenshot" style="width: 24%; padding: 10px;">
    <img src="./assets/screenshot-home.jpeg" alt="First Screenshot" style="width: 24%; padding: 10px;">
    <img src="./assets/screenshot-listing.jpeg" alt="First Screenshot" style="width: 24%; padding: 10px;">
    <img src="./assets/screenshot-render.jpeg" alt="First Screenshot" style="width: 24%; padding: 10px;">
</div>