from seleniumbase import SB

def extraer_oferta_infojobs(url):
    """
    Extrae información de una oferta de trabajo de InfoJobs
    """
    with SB(uc=True, headed=True, incognito=True) as sb:

        sb.activate_cdp_mode(url)
        sb.sleep(2)  # Esperar a que cargue la página

        sb.solve_captcha()

        sb.sleep(10)

        sb.save_screenshot_to_logs("captcha_resuelto.png")
        sb.sleep(4000)
        
        datos_oferta = {}
        
        try:
            # Extraer título del puesto
            titulo = sb.get_text("h1.ij-Heading-title1")
            datos_oferta['titulo'] = titulo
            print(f"\n=== {titulo} ===\n")
            
            # Extraer empresa
            empresa = sb.get_text("a.ij-OfferDetailHeader-companyLogo-companyName")
            datos_oferta['empresa'] = empresa
            print(f"Empresa: {empresa}\n")
            
            # Extraer ubicación
            ubicacion = sb.get_text("p.ij-Text-body1:contains('La Rioja')")
            datos_oferta['ubicacion'] = ubicacion
            print(f"Ubicación: {ubicacion}\n")
            
            # Extraer salario
            try:
                salario = sb.get_text("p.ij-Text-body1:contains('€')")
                datos_oferta['salario'] = salario
                print(f"Salario: {salario}\n")
            except:
                datos_oferta['salario'] = "No especificado"
                print("Salario: No especificado\n")
            
            # Extraer tipo de contrato
            try:
                contrato = sb.get_text("p.ij-Text-body1:contains('Contrato')")
                datos_oferta['contrato'] = contrato
                print(f"Contrato: {contrato}\n")
            except:
                datos_oferta['contrato'] = "No especificado"
            
            print("=" * 50)
            print("REQUISITOS")
            print("=" * 50)
            
            # Extraer estudios mínimos
            try:
                estudios = sb.find_elements("dt.ij-Heading-headline2:contains('Estudios mínimos') + dd p")
                if estudios:
                    datos_oferta['estudios_minimos'] = estudios[0].text
                    print(f"\nEstudios mínimos: {estudios[0].text}")
            except:
                datos_oferta['estudios_minimos'] = "No especificado"
            
            # Extraer experiencia mínima
            try:
                experiencia = sb.find_elements("dt.ij-Heading-headline2:contains('Experiencia mínima') + dd p")
                if experiencia:
                    datos_oferta['experiencia_minima'] = experiencia[0].text
                    print(f"Experiencia mínima: {experiencia[0].text}")
            except:
                datos_oferta['experiencia_minima'] = "No especificado"
            
            # Extraer conocimientos necesarios (tags)
            try:
                conocimientos = sb.find_elements("span.sui-AtomTag-label")
                lista_conocimientos = [tag.text for tag in conocimientos]
                datos_oferta['conocimientos'] = lista_conocimientos
                print(f"\nConocimientos necesarios:")
                for conocimiento in lista_conocimientos:
                    print(f"  • {conocimiento}")
            except:
                datos_oferta['conocimientos'] = []
            
            # Extraer sector
            try:
                sector = sb.find_elements("dt.ij-Heading-headline2:contains('Sector') + dd p")
                if sector:
                    datos_oferta['sector'] = sector[0].text
                    print(f"\nSector: {sector[0].text}")
            except:
                datos_oferta['sector'] = "No especificado"
            
            print("\n" + "=" * 50)
            print("DESCRIPCIÓN DEL PUESTO")
            print("=" * 50 + "\n")
            
            # Extraer descripción completa
            try:
                descripcion_div = sb.find_element("article h3:contains('Descripción') + div")
                
                # Extraer párrafos
                parrafos = descripcion_div.find_elements("tag_name", "p")
                descripcion_texto = []
                
                for parrafo in parrafos:
                    texto = parrafo.text.strip()
                    if texto:
                        descripcion_texto.append(texto)
                        print(texto)
                        print()
                
                # Extraer listas (viñetas)
                listas = descripcion_div.find_elements("tag_name", "ul")
                for lista in listas:
                    items = lista.find_elements("tag_name", "li")
                    for item in items:
                        texto = item.text.strip()
                        if texto:
                            descripcion_texto.append(f"• {texto}")
                            print(f"  • {texto}")
                    print()
                
                datos_oferta['descripcion'] = "\n".join(descripcion_texto)
                
            except Exception as e:
                print(f"Error al extraer descripción: {e}")
                datos_oferta['descripcion'] = "No disponible"
            
            # Extraer información adicional
            print("=" * 50)
            print("INFORMACIÓN ADICIONAL")
            print("=" * 50 + "\n")
            
            try:
                categoria = sb.get_text("dt.ij-Heading-headline2:contains('Categoría') + dd a")
                datos_oferta['categoria'] = categoria
                print(f"Categoría: {categoria}")
            except:
                datos_oferta['categoria'] = "No especificado"
            
            try:
                nivel = sb.find_elements("dt.ij-Heading-headline2:contains('Nivel') + dd p")
                if nivel:
                    datos_oferta['nivel'] = nivel[0].text
                    print(f"Nivel: {nivel[0].text}")
            except:
                datos_oferta['nivel'] = "No especificado"
            
            try:
                vacantes = sb.find_elements("dt.ij-Heading-headline2:contains('Vacantes') + dd p")
                if vacantes:
                    datos_oferta['vacantes'] = vacantes[0].text
                    print(f"Vacantes: {vacantes[0].text}")
            except:
                datos_oferta['vacantes'] = "No especificado"
            
        except Exception as e:
            print(f"Error durante la extracción: {e}")
        
        return datos_oferta

# URL de ejemplo de InfoJobs
url_oferta = "https://browserleaks.com/canvas" #logrono/operario-bodega/of-ibfcfa3ee59437798c829a18c50adcf

# Ejecutar extracción
datos = extraer_oferta_infojobs(url_oferta)

print("\n" + "=" * 50)
print("EXTRACCIÓN COMPLETADA")
print("=" * 50)