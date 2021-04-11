// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G'];
    return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
        newStrand.push(returnRandBase());
    }
    return newStrand;
};

// Factory function to create multiple objects

const pAequorFactory = (specimenNum, dna) => {
    return {
        specimenNum: specimenNum,
        dna: dna,
        mutate() {
            let randIndex = Math.floor(Math.random() * this.dna.length);
            let newBase = returnRandBase();
            while (this.dna[randIndex] === newBase) {
                newBase = returnRandBase();
            }
            this.dna[randIndex] = newBase;
            return this.dna; 
        },
        compareDNA(otherOrg) {
            let similarities = this.dna.reduce((acc, curr, idx, arr) => {
                if (arr[idx] === otherOrg.dna[idx]) {
                    return acc + 1;
                } else {
                    return acc;
                }
            }, 0);
            const percentOfDNAshared = (similarities / this.dna.length) * 100;
            const percentageTo2Deci = percentOfDNAshared.toFixed(2);
            console.log(`${this.specimenNum} and ${otherOrg.specimenNum} have ${percentageTo2Deci}% DNA in common.`)
        },
        willLikelySurvive() {
            const cOrg = this.dna.filter(el => el === 'C' || el === 'G');
            return cOrg.length / this.dna.length >= 0.6;
        },
        complementStrand() {
            let obj1 = [];
            let obj2 = this.dna;
            for (let i=0; i<15; i++) {
                if (obj2[i] === 'A') {
                    obj1.push('T');
                } else if (obj2[i] === 'T') {
                    obj1.push('A');
                } else if (obj2[i] === 'G') {
                    obj1.push('C');
                } else if (obj2[i] === 'C') {
                    obj1.push('G');
                }
            }
            return obj1;
        }
    }
};
// To test complementStrand()
// console.log(pAequorFactory(1, ['T', 'A', 'C', 'A', 'G', 'A', 'T', 'A', 'C', 'G', 'A', 'C', 'G', 'A', 'T']).complementStrand());

//To test willLikelySurvive()
//console.log(pAequorFactory(1, mockUpStrand()).willLikelySurvive());

// Creating 30 instances of pAequor that can survive stored in an array
let survivingSpecimen = [];
let idCounter = 1;

while (survivingSpecimen.length < 30) {
    let newOrg = pAequorFactory(idCounter, mockUpStrand());
    if (newOrg.willLikelySurvive()) {
        survivingSpecimen.push(newOrg);
    }
    idCounter++;
}
//console.log(survivingSpecimen);
