
## Core Security Principle
The most effective way to prevent XXE vulnerabilities is to **completely disable Document Type Definitions (DTDs)** and **disallow the resolution of External Entities** in the application's XML parser configuration. Because virtually all XXE attacks rely on `<!DOCTYPE>` declarations, disabling DTD processing eliminates both External Entity file reads and "Billion Laughs" Denial of Service attacks.



## 1. Language-Specific Parser Hardening

### Python (`lxml` and `defusedxml`)
By default, Python's `xml.etree.ElementTree` is safe against external file reads, but `lxml` requires explicit hardening. The recommended standard is to use the `defusedxml` package or disable `resolve_entities` in `lxml`:

```python
from lxml import etree

# Secure configuration: Disable entity resolution and network access
parser = etree.XMLParser(resolve_entities=False, no_network=True, load_dtd=False)
tree = etree.fromstring(user_xml_input, parser=parser)
