# 📦 Deploy Interbras

Para que el deploy funcione correctamente, es necesario agregar las siguientes variables de entorno:

---

## 🔐 Variables necesarias

```env
DATABASE_AUTH_TOKEN=...
DATABASE_URL=...
FTP_SERVER=ftp.interbrasoficial.com
FTP_USERNAME=example@interbrasoficial.com
FTP_PASSWORD=...
```

---

## 📌 Detalles importantes

- 🔁 El deploy se realiza por **FTP** utilizando el puerto **21** (FTPS explícito).
- 📁 Estas variables deben ser configuradas en:

  👉 [https://github.com/FabianBarua/interbrasoficial.com/settings/secrets/actions](https://github.com/FabianBarua/interbrasoficial.com/settings/secrets/actions)

  Dentro de la sección: **Repository secrets**

---

✅ Con esto ya se puede hacer deploy automáticamente.
