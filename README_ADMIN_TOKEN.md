# Little Secret Admin mit GitHub Token

Diese Version verwendet Sveltia CMS direkt mit GitHub Access Token.

## Wichtig

Bei `/admin/` nicht auf "Sign in with GitHub" klicken. Diese OAuth-Variante würde zu Netlify führen.
Stattdessen "Sign in with Token" verwenden.

## Token erstellen

1. GitHub öffnen: https://github.com/settings/tokens?type=beta
2. Generate new token
3. Repository: `ursail/littlesecret`
4. Permission: `Contents: Read and write`
5. Token kopieren und in `/admin/` bei "Sign in with Token" einfügen.

Der Token wird nur im Browser gespeichert.
