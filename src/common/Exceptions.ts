class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = "CUSTOM_ERROR";
        this.message = message;
        (<any>Object).setPrototypeOf(this, CustomError.prototype);
    }
}

export { CustomError };