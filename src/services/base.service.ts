import { displayName, removeEmptyValue } from "@/utils";
import Http, { get, post, patch, remove, put } from "@/utils/http";

type TBaseRequest = {
  TSearch: any;
  TCreate: any;
  TUpdate: any;
  TExport: any;
};

type TBaseResponse = {
  TList: any;
  TDetail: any;
  TExcelFile: any;
};

const CODE_TABLE_URL = "/code-table";
const USERS_URL = "/users";

type TCodeTableResponse = {
  [k: string]: {
    categoryID: string;
    code: string;
    categoryName: string;
    displayOrder: number;
    displayName: string;
    useFlag: number;
    explanation: string;
  }[];
};

type TUserResponse = {
  account: string;
  userID: string;
  roleCode: number;
  firstName: string;
  lastName: string;
}[];

type IOption = {
  label: string;
  value: string;
};

type TOptionsResponse = {
  [k: string]: IOption;
};

export class BaseService<
  T extends Partial<TBaseRequest>,
  R extends Partial<TBaseResponse>
> {
  get entity(): string {
    throw new Error("entity getter not defined");
  }

  get request() {
    return { Http, get, post, patch, remove, put };
  }

  async getUsers() {
    return await get<TUserResponse>({ url: USERS_URL });
  }

  async getUserOptions() {
    const users = await this.getUsers();

    return users.map(({ account, userID, roleCode, firstName, lastName }) => ({
      label: displayName(firstName, lastName, account),
      value: userID,
      role: roleCode,
    }));
  }

  async getCodeTable(categoryIdList?: string[]) {
    return await get<TCodeTableResponse>(
      { url: CODE_TABLE_URL },
      { params: { categoryIdList } }
    );
  }

  async getSelectOptions(categoryIdList?: string[]) {
    const codeTable = await this.getCodeTable(categoryIdList);
    return Object.keys(codeTable).reduce(
      (response: any, categoryId: string) => {
        response[categoryId] = codeTable[categoryId].map(
          ({ code, displayName }) => ({
            value: code,
            label: displayName,
          })
        );

        return response;
      },
      {}
    ) as TOptionsResponse[];
  }

  async getList(parameters: Partial<T["TSearch"]> = {}) {
    const params = removeEmptyValue(parameters);

    return await get<R["TList"]>({ url: this.entity! }, { params });
  }

  async getById(id: string, subID: string) {
    return await get({ url: `${this.entity}/${id}/${subID}` });
  }

  async create(data: T["TCreate"]) {
    return await post<R["TDetail"]>(
      { url: this.entity! },
      { data: removeEmptyValue(data) }
    );
  }

  async update(data: T["TUpdate"]) {
    return await put<R["TDetail"]>(
      { url: this.entity! },
      { data: removeEmptyValue(data) }
    );
  }

  async remove(id: string) {
    return await remove({ url: `${this.entity}/${id}` });
  }

  async exportExcel(parameters: Partial<T["TExport"]> = {}) {
    const params = removeEmptyValue(parameters);
    return await get<string>(
      { url: `${this.entity!}/export`, responseType: "blob" },
      { params }
    );
  }
}
