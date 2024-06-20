export default class Provider {
    private static self: Provider | null = null;

    protected state: {[k: string]: object};

    constructor() {
        this.state = {};
        if (Provider.self == null) {
            Provider.self = this;
        }

        return Provider.self;
    }

    public static get<T>(key: string): T {
        if (!Provider.self?.state[key]) {
            throw new Error('the key does not exists');
        }

        return Provider.self?.state[key] as T;
    }

    public static set<T>(key: string, value: T) {
        if (!Provider.self) {
            Provider.self = new Provider();
        }

        Provider.self.state[key] = value as object;
    }
}