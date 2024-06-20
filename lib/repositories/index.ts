export interface IRepository<T> {
    create(model: T): Promise<T>;
    readById(id: number): Promise<T | null>;
    update(model: T): Promise<void>;
    delete(model: number | T): Promise<void>;
}