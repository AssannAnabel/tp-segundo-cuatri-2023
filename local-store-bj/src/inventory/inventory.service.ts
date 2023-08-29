import { Body, Injectable } from '@nestjs/common';
const URL_inventary='http://localhost:3030/inventary';
import { Inventory } from './inventory.interface';

@Injectable()
export class InventaryService {

    private async setId(): Promise<number> {
        const invtry = await this.getInvtry();
        const id = invtry.pop().id +1;
        return id;
    }
    private async getAll(): Promise<Inventory[]> {//contiene todos los datos del inventario
        const res = await fetch(URL_inventary);
        const parsed = await res.json();
        return parsed;
    }

    async getInvtry(): Promise<Inventory[]> {
        try {
            return this.getAll();
        } catch (err) {
            throw new Error(err);
        }
    }
//GETBYID
    async getInvtryById(id: number): Promise<Inventory> {
        try {
            const res = await fetch(URL_inventary + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const parsed = await res.json();
            return parsed;
        } catch (err) {
            throw new Error(err);
        }
    }
//POST
    async createInvtry(invtry: Inventory): Promise<Inventory> {
        try {
            const id = await this.setId();
            const newInvtry = { ...invtry, id };
            const res = await fetch(URL_inventary, {
                method: 'POST',
                headers: {
                    'Content-Type:': 'application/json',
                },
                body: JSON.stringify(newInvtry)
            });
            const parsed = await res.json();
            return parsed;
        } catch (err) {
            throw new Error(err);
        }
    }
//DELETE
    async deleteInvtryById(id: number): Promise<Inventory> {
        try {
            const res = await fetch(URL_inventary + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const parsed = await res.json();
            return parsed;
        } catch (err) {
            throw new Error(err);
        }
    }
//PUT
    async updateInvtryById(id: number, invtry: Inventory): Promise<Inventory> {
        try {
            const isInvtry = await this.getInvtryById(id);
            //Object.keys verifica si isInvtry viene con datos, y si no, se detiene ahi.
            if (!Object.keys(isInvtry).length) return;
            const updateInvtry = { ...invtry, id };
            const res = await fetch(URL_inventary + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateInvtry)
            });
            const parsed = await res.json();
            return parsed;
        } catch (err) {
            throw new Error(err)
        }
    }
}