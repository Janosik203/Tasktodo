interface BazaDanych {
  insert(id: number, value: string): void

  findById(id: number): string
}

class InMemoryBazaDanych implements BazaDanych {
  private baza: Record<number, string> = {}

  findById(id: number): string {
    return this.baza[id];
  }

  insert(id: number, value: string): void {
    this.baza[id] = value
  }
}


class MysqlBazaDanych implements BazaDanych {
  private connection: any = {}

  constructor(connection: any) {
    this.connection = connection
  }

  findById(id: number): string {
    return this.connection.find(id);
  }

  insert(id: number, value: string): void {
    this.connection.insert(id, value)
  }
}


const bazaDanych: BazaDanych = new InMemoryBazaDanych()
const bazaDanych2: BazaDanych = new MysqlBazaDanych(null)
