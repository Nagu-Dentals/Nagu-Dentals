import os
import re

directory = 'services'
css_link = '<link rel="stylesheet" href="../assets/css/services.css">'

meta_descriptions = {
    "cosmetic-dentistry.html": "Premium cosmetic dentistry at Nagu Dental. From veneers to smile design, transform your smile with our aesthetic excellence.",
    "dental-implants.html": "Permanent tooth replacement with premium dental implants at Nagu Dental. Restore your smile and function with 3D precision.",
    "emergency-dentistry.html": "24/7 emergency dental care in Bengaluru. Fast relief for toothaches, broken teeth, and dental trauma at Nagu Dental.",
    "invisalign.html": "Clear aligner therapy with Invisalign at Nagu Dental. Straighten your teeth discreetly with comfortable, removable aligners.",
    "pediatric-dentistry.html": "Gentle dental care for children at Nagu Dental. We create positive dental experiences for your little ones in a friendly environment.",
    "preventive-dentistry.html": "Keep your smile healthy with preventive care at Nagu Dental. Professional cleanings, checkups, and early detection for long-term health.",
    "root-canal.html": "Pain-free root canal treatment at Nagu Dental. Save your natural teeth with our advanced endodontic care and precision technology.",
    "smile-makeover.html": "Comprehensive smile makeovers at Nagu Dental. A customized combination of treatments to give you the perfect, radiant smile you deserve.",
    "teeth-whitening.html": "Professional teeth whitening at Nagu Dental. Brighten your smile by several shades with our safe and effective whitening systems."
}

for filename in os.listdir(directory):
    if filename.endswith(".html") and filename != "service-template.html":
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r') as f:
            content = f.read()

        # Remove internal style block
        content = re.sub(r'<style>.*?</style>', css_link, content, flags=re.DOTALL)

        # Add meta description
        desc = meta_descriptions.get(filename, "Premium dental services at Nagu Dental Clinic.")
        meta_tag = f'\n  <meta name="description" content="{desc}">'
        content = re.sub(r'(<title>.*?</title>)', r'\1' + meta_tag, content)

        with open(filepath, 'w') as f:
            f.write(content)

print("Refactored all service pages.")
