interface IAlertField {
  name: String
  value: String
}

interface IAlert {
  alert(
    title: String,
    field1: IAlertField,
    field2: IAlertField,
    description?: String,
    imageUrl?: String,
    linkUrl?: String,
    primaryColor?: String,
    secondaryColor?: String
  )
}

export { IAlert, IAlertField }
