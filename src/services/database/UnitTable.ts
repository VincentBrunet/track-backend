import { Unit, UnitId, UnitShell } from './../../lib/data/Unit';
import { Connection } from './Connection';
import { ErrorDatabase } from './ErrorDatabase';

export class UnitTable {
  /**
   * Base
   */
  private static table = 'unit';
  static async list(): Promise<Unit[]> {
    return await Connection.list<Unit>(UnitTable.table);
  }
  static async update(value: Unit) {
    await Connection.update<Unit>(UnitTable.table, value);
  }
  static async insert(value: UnitShell) {
    await Connection.insert<UnitShell>(UnitTable.table, value);
  }
  static async insertIgnoreFailure(value: UnitShell) {
    await Connection.insertIgnoreFailure<UnitShell>(UnitTable.table, value);
  }
  /**
   * Utils
   */
  static async mapById() {
    const list = await UnitTable.list();
    const mapping = new Map<UnitId, Unit>();
    for (const item of list) {
      mapping.set(item.id, item);
    }
    return mapping;
  }
  static async mapByCode() {
    const list = await UnitTable.list();
    const mapping = new Map<string, Unit>();
    for (const item of list) {
      mapping.set(item.code, item);
    }
    return mapping;
  }
  /**
   * Cached lookup
   */
  private static cacheById: Map<number, Unit>;
  static async lookupById(id: number) {
    const current = UnitTable.cacheById?.get(id);
    if (current) {
      return current;
    }
    UnitTable.cacheById = await UnitTable.mapById();
    return UnitTable.cacheById.get(id);
  }
  private static cacheByCode: Map<string, Unit>;
  static async lookupByCode(code: string) {
    if (!UnitTable.cacheByCode) {
      UnitTable.cacheByCode = await UnitTable.mapByCode();
    }
    if (!code) {
      code = '';
    }
    const cached = UnitTable.cacheByCode.get(code);
    if (cached) {
      return cached;
    }
    await UnitTable.insertIgnoreFailure({
      code: code,
    });
    UnitTable.cacheByCode = await UnitTable.mapByCode();
    const final = UnitTable.cacheByCode.get(code);
    if (!final) {
      throw new ErrorDatabase('Could not create unit: ' + code);
    }
    return final;
  }
}
