type IAlertField = {
  name: string;
  value: string;
};

interface IAlert {
  alert(
    title: string,
    field1: IAlertField,
    field2: IAlertField,
    description?: string,
    imageUrl?: string,
    linkUrl?: string,
    primaryColor?: string,
    secondaryColor?: string
  );
}

export { IAlert, IAlertField };
