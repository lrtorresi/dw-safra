import { Subject } from "rx-lite";

export class RxJsEventEmitter {
    public subjects: Object;

    private constructor() {
        this.subjects = {};
    }

    public static getInstance(): RxJsEventEmitter {
        if (!window["RxJsEventEmitter"]) {
            window["RxJsEventEmitter"] = new RxJsEventEmitter();
        }
        return window["RxJsEventEmitter"];
    }

    public emit(name: string, data: any): void {
        if (!this.subjects[name]) {
            this.subjects[name] = new Subject();
        }

        this.subjects[name].onNext(data);
    }

    public on(name: string, handler: any): void {
        if (!this.subjects[name]) {
            this.subjects[name] = new Subject();
        }

        this.subjects[name].subscribe(handler);
    }
}
