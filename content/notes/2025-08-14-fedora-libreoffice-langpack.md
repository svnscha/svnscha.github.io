+++
title = "Fedora: Installing LibreOffice Language Packs"
date = "2025-08-14"
+++

Need LibreOffice in your native language? Fedora packages language packs separately, so you'll need to install them manually to get proper localization, spell checking, and hyphenation.

### Installing a specific language pack

To install the German language pack for LibreOffice:

```bash
sudo dnf install libreoffice-langpack-de
```

### Finding available language packs

To see all available LibreOffice language packs:

```bash
dnf search libreoffice-langpack
```

### Common language pack codes

- `de` - German
- `es` - Spanish  
- `fr` - French
- `it` - Italian
- `pt` - Portuguese
- `ru` - Russian

After installation, restart LibreOffice and the new language should be available in the language settings.
