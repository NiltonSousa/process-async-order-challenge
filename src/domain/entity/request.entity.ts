export interface RequestItems {
  name: string;
}

export type RequestStatus = "CREATED" | "PROCESSED" | "ERROR";

export class RequestEntity {
  constructor(
    public readonly id: string,
    public readonly items: RequestItems[],
    public readonly status: RequestStatus
  ) {}

  static build(
    id: string,
    items: RequestItems[],
    status: RequestStatus
  ): RequestEntity {
    return new RequestEntity(id, items, status);
  }
}
