export default class Token{
    constructor(name, fingerprint, policyId, quantity, unit){
        this.name = name;
        this.fingerprint = fingerprint;
        this.policyId = policyId;
        this.quantity = quantity; 
        this.unit = unit;
    }

}