// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export default class FirestoreMock {
  mockCollection: any;
  mockWhere: any;
  mockOrderBy: any;
  mockAdd: any;
  mockGet: any;
  mockOnSnaptshot: jest.Mock<any, [success: any, error: any]>;
  constructor() {
    // mocked methods that return the class
    this.mockCollection = jest.fn(() => {
      return this;
    });
    this.mockWhere = jest.fn(() => {
      return this;
    });
    this.mockOrderBy = jest.fn(() => {
      return this;
    });

    // methods that return promises
    this.mockAdd = jest.fn(() => {
      return Promise.resolve(this._mockAddReturn);
    });
    this.mockGet = jest.fn(() => {
      return Promise.resolve(this._mockGetReturn);
    });

    // methods that accepts callbacks
    this.mockOnSnaptshot = jest.fn((success) => {
      return success(this._mockOnSnaptshotSuccess);
    });

    // return values
    this._mockAddReturn = null;
    this._mockGetReturn = null;
    this._mockOnSnaptshotSuccess = null;
  }
  _mockAddReturn(_mockAddReturn: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  _mockGetReturn(_mockGetReturn: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  _mockOnSnaptshotSuccess(_mockOnSnaptshotSuccess: any): any {
    throw new Error("Method not implemented.");
  }

  collection(c: any) {
    return this.mockCollection(c);
  }

  where(...args: any) {
    return this.mockWhere(...args);
  }

  orderBy(...args: any) {
    return this.mockOrderBy(...args);
  }

  add(a: any) {
    return this.mockAdd(a);
  }

  get() {
    return this.mockGet();
  }

  onSnapshot(success: any, error: any) {
    return this.mockOnSnaptshot(success, error);
  }

  set mockAddReturn(val: (_mockAddReturn: any) => Promise<any>) {
    this._mockAddReturn = val;
  }

  set mockGetReturn(val: (_mockGetReturn: any) => Promise<any>) {
    this._mockGetReturn = val;
  }

  set mockOnSnaptshotSuccess(val: (_mockOnSnaptshotSuccess: any) => any) {
    this._mockOnSnaptshotSuccess = val;
  }

  reset() {
    // reset all the mocked returns
    this._mockAddReturn = null;
    this._mockGetReturn = null;
    this._mockOnSnaptshotSuccess = null;

    // reset all the mocked functions
    this.mockCollection.mockClear();
    this.mockWhere.mockClear();
    this.mockOrderBy.mockClear();
    this.mockAdd.mockClear();
    this.mockGet.mockClear();
  }
}
