# 🚨 REPORTE DE BRECHA DE SEGURIDAD

**Fecha de detección:** 25 de noviembre de 2025
**Severidad:** CRÍTICA
**Estado:** EN PROCESO DE MITIGACIÓN

---

## 📋 Resumen

Se detectaron **credenciales SMTP reales** expuestas en el archivo `.env.local.example` que fue subido al repositorio de GitHub.

## 🔍 Detalles de la Exposición

### Credenciales Expuestas:
- **Archivo:** `.env.local.example`
- **Commits afectados:** 
  - `7576e07` - 03/11/2025 (primera aparición)
  - `4b498d2` - 24/11/2025 (aún presente)
- **Datos comprometidos:**
  ```
  SMTP_HOST: mail.vision360ia.com
  SMTP_USER: noreply@vision360ia.com
  SMTP_PASS: 1g5[%ce@5C]l  ← CONTRASEÑA EN TEXTO PLANO
  ```

### Vector de Exposición:
- ✅ **Repositorio GitHub:** Público/Privado (verificar)
- ✅ **Historial Git:** Presente en 2 commits
- ✅ **Tiempo expuesto:** ~22 días (03/11/2025 - 25/11/2025)

---

## ⚠️ ACCIONES REQUERIDAS INMEDIATAMENTE

### 1. 🔐 CAMBIAR CONTRASEÑA SMTP (PRIORIDAD 1)
**Estado:** ⏳ PENDIENTE

**Pasos:**
1. Acceder al panel de correo (cPanel/SiteGround)
2. Cambiar contraseña de `noreply@vision360ia.com`
3. Actualizar `.env.local` en todos los entornos:
   - Desarrollo local
   - Vercel (Environment Variables)

**Verificación:**
```bash
# Probar que el email sigue funcionando con nueva contraseña
curl -X POST http://localhost:9002/api/form/contacto \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"test"}'
```

---

### 2. 🧹 LIMPIAR HISTORIAL DE GIT (PRIORIDAD 2)
**Estado:** ⏳ PENDIENTE

**Opción A: git-filter-repo (RECOMENDADO)**
```bash
# Instalar git-filter-repo
pip install git-filter-repo

# Eliminar credenciales del historial
git filter-repo --path .env.local.example --invert-paths --force

# Volver a añadir el archivo sanitizado
git add .env.local.example
git commit -m "docs: Add sanitized .env.local.example"

# Force push
git push origin main --force
```

**Opción B: BFG Repo-Cleaner**
```bash
# Descargar BFG: https://rtyley.github.io/bfg-repo-cleaner/
java -jar bfg.jar --delete-files .env.local.example

git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push origin main --force
```

**⚠️ IMPORTANTE:** 
- Esto reescribirá el historial de git
- Todos los colaboradores deben hacer `git clone` de nuevo o:
  ```bash
  git fetch origin
  git reset --hard origin/main
  ```

---

### 3. 📧 REVISAR ACTIVIDAD SOSPECHOSA (PRIORIDAD 3)
**Estado:** ⏳ PENDIENTE

**Verificar:**
1. **Logs del servidor de correo:**
   - ¿Hay envíos no autorizados desde `noreply@vision360ia.com`?
   - ¿Picos de actividad inusuales?

2. **Logs de Vercel:**
   - ¿Requests inusuales al endpoint `/api/form/contacto`?
   - ¿IPs sospechosas?

3. **Repositorio GitHub:**
   - ¿El repo es público o privado?
   - ¿Quién tiene acceso?

**Comandos útiles:**
```bash
# Ver quién ha clonado el repo (solo si tienes acceso admin en GitHub)
# GitHub > Settings > Security > Insights

# Verificar si el repo es público
gh repo view twetter99/vision360ia2 --json visibility
```

---

### 4. 🔒 FORTALECER SEGURIDAD (PRIORIDAD 4)
**Estado:** ⏳ PENDIENTE

**Implementar:**

1. **Rotar todas las credenciales:**
   - ✅ SMTP password (ya en proceso)
   - ⏳ Google reCAPTCHA keys (opcional, no crítico)
   - ⏳ Cualquier otra API key en el proyecto

2. **Habilitar 2FA en todas las cuentas:**
   - GitHub
   - Vercel
   - SiteGround/cPanel
   - Dominios (Namecheap, GoDaddy, etc.)

3. **Implementar secret scanning:**
   ```bash
   # Añadir pre-commit hook
   npm install --save-dev @commitlint/cli husky lint-staged
   
   # Configurar husky para detectar secrets
   npx husky add .husky/pre-commit "npx lint-staged"
   ```

4. **Usar servicios de gestión de secrets:**
   - Vercel Environment Variables (ya en uso)
   - Alternativa: AWS Secrets Manager, HashiCorp Vault

---

## ✅ ACCIONES COMPLETADAS

- ✅ **25/11/2025:** Sanitizado `.env.local.example` (commit `c36a84d`)
- ✅ **25/11/2025:** Documentado en este reporte
- ✅ **25/11/2025:** Verificado que `.env.local` está en `.gitignore`

---

## 📚 Lecciones Aprendidas

1. **NUNCA incluir valores reales en archivos `.example`**
   - Usar valores ficticios: `tu_password_aqui`, `REPLACE_ME`, etc.

2. **Revisar archivos antes de hacer commit**
   ```bash
   git diff --cached  # Ver qué vas a subir
   ```

3. **Usar herramientas de detección:**
   - [git-secrets](https://github.com/awslabs/git-secrets)
   - [truffleHog](https://github.com/trufflesecurity/trufflehog)
   - [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning)

4. **Automatizar revisiones:**
   - Pre-commit hooks
   - CI/CD pipelines con secret detection

---

## 🔗 Referencias

- [OWASP: Sensitive Data Exposure](https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure)
- [GitHub: Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [git-filter-repo Documentation](https://github.com/newren/git-filter-repo)

---

**Responsable:** Juan Blanco (twetter@gmail.com)
**Última actualización:** 25/11/2025 - 11:00 CET
