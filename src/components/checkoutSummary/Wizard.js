import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { FaEdit, FaTrash } from "react-icons/fa";

const WizardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin-bottom: 1rem;

  @media screen and (max-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    margin-left: 0;
    
  }

  @media screen and (max-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    margin-left: 0;
  }
`;

const AddressCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.darkerGray};
  border-radius: 0.2rem;
  background-color: ${({ theme }) => theme.colors.lightestGray};
`;

const AddressInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddressActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts[1]};
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.darkGray}; 
  margin-top: 1rem;

  input {
    margin-right: 0.5rem;  // Añade un margen a la derecha del input
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.darkerGray};
  &:hover {
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 5px;
  margin-bottom: 1rem;
  margin-left: 10rem;

  @media screen and (max-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    margin-left: 0;
  }
`;

const ProgressBar = styled.div`
  width: ${({ width }) => width}%;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.darkGray};
  border-radius: 5px;
  transition: width 0.3s ease-in-out;
`;

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SummaryText = styled.span`
  margin-left: 0.5rem;
  font-family: ${({ theme }) => theme.fonts[1]};
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.darkGray};
`;

const WizardStep = styled.div`
  display: ${({ active }) => (active ? "block" : "none")};
  width: 100%;
  max-width: 500px;
  padding: 1rem;
  margin-left: 10rem;
  border: 1px solid ${({ theme }) => theme.colors.darkerGray};
  border-radius: 0.2rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.colors.lightestGray};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:first-child {
    margin-top: 1rem;
  }
  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    margin-left: 0;
  }

  @media screen and (max-width: ${({ theme }) => theme.mediaScreen.lgLaptop}) {
    margin-left: 0;
  }
  
`;

const WizardLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts[1]};
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.darkGray};
`;

const WizardInput = styled.input`
  width: ${({ width }) => width || "100%"};
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  gap: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.darkerGray};
  border-radius: 0.2rem;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.darkGray};
  font-family: ${({ theme }) => theme.fonts[1]};
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const WizardSelect = styled.select`
  width: ${({ width }) => width || "100%"};
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.darkerGray};
  border-radius: 0.2rem;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.darkGray};
  font-family: ${({ theme }) => theme.fonts[1]};
  margin-bottom: 1rem;
  padding: 0.5rem;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23000000'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  background-size: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 1rem;
`;

const WizardButton = styled.button`
  background-color: ${({ theme }) => theme.colors.darkGray};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 0.2rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.mediumGray};
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.lightestGray};
    color: ${({ theme }) => theme.colors.darkerGray};
    cursor: not-allowed;
  }
  margin-bottom: 1rem;
  margin-top: 1rem;
  font-family: ${({ theme }) => theme.fonts[1]};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const H3 = styled.h3`
  text-align: left;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.darkGray};
  font-family: ${({ theme }) => theme.fonts[0]};
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 1.5rem;
  margin-left: 0;
`;

const H4 = styled.h4`
    text-align: left;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.darkGray};
    font-family: ${({ theme }) => theme.fonts[0]};
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 1px;
    line-height: 1.5rem;
    margin-left: 0;
    `;

const InlineContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    flex-direction: row;
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.darkerGray};
  border-radius: 0.2rem;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  padding: 1rem;
  z-index: 100;

  @media screen and (max-width: ${({ theme }) => theme.mediaScreen.tablet640}) {
    width: 80%;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

const AddressSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.darkerGray};
  border-radius: 0.2rem;
  margin-bottom: 0.5rem;
`;

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border: 1px solid ${({ theme }) => theme.colors.darkerGray};
  border-radius: 0.2rem;
  margin-bottom: 1rem;

  
`;

const MapOverlay = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.darkGray};
  cursor: pointer;
  pointer-events: ${({ isBlurred }) => isBlurred ? 'auto' : 'none'};
  opacity: ${({ isBlurred }) => isBlurred ? 1 : 0};
  transition: opacity 0.3s ease;
  z-index: 1;
  font-family: ${({ theme }) => theme.fonts[1]};
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.darkGray};
  letter-spacing: 1px;
`;

const GoogleMapStyled = styled(GoogleMap)`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;
`;

const Wizard = ({ onCompletion }) => {
    const [editIndex, setEditIndex] = useState(null);
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [phone, setPhone] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [facturaConRUT, setFacturaConRUT] = useState(false);
    const [razonSocial, setRazonSocial] = useState("");
    const [rut, setRUT] = useState("");
  
    const [recipient, setRecipient] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
    const [department, setDepartment] = useState("");
    const [street, setStreet] = useState("");
    const [doorNumber, setDoorNumber] = useState("");
    const [apartment, setApartment] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [location, setLocation] = useState({ lat: -34.9011, lng: -56.1645 });
    const [remarks, setRemarks] = useState("");
    
    const [showPopup, setShowPopup] = useState(false);
    const [deliveryType, setDeliveryType] = useState("");
    const stepsCount = 5;
    const progress = (step / stepsCount) * 100;

    const handleDeliveryChoice = (choice) => {
      setDeliveryType(choice);
      if (choice === "takeaway") {
        setStep(5);
      } else {
        setStep(4); // Continúa a la selección de dirección
      }
    };



    const [isMapBlurred, setIsMapBlurred] = useState(true);
    const handleEditAddress = (index) => {
      const address = addresses[index];
      setStreet(address.street);
      setDoorNumber(address.doorNumber);
      setApartment(address.apartment);
      setDepartment(address.department);
      setPostalCode(address.postalCode);
      setLocation(address.location);
      setShowPopup(true);
      setEditIndex(index);
    };

    const handleMapClick = () => {
        setIsMapBlurred(false);
    };
  
    const handleDeleteAddress = (index) => {
      const updatedAddresses = addresses.filter((_, i) => i !== index);
      setAddresses(updatedAddresses);
      setSelectedAddressIndex(null);
    };
    const handleEmailSubmit = (e) => {
      e.preventDefault();
      const emailExists = true;
  
      if (emailExists) {
        setStep(2);
      } else {
        setStep(2);
      }
    };
  
    const handleBillingSubmit = (e) => {
      e.preventDefault();
      setStep(3);
    };
  
    const handleShippingSubmit = (e) => {
      e.preventDefault();
      setStep(4);
    };

    const handleFinish = (e) => {
      e.preventDefault();
      const userDetails = {
      email,
      firstName,
      lastName,
      country,
      documentType,
      documentNumber,
      phone,
      termsAccepted,
      facturaConRUT,
      razonSocial,
      rut,
      deliveryType,
      recipient,
      address: addresses[selectedAddressIndex],
      remarks,
      };
      console.log(userDetails);
      localStorage.setItem('userDetails', JSON.stringify(userDetails));

      const isMobile = window.innerWidth <= 768; // Puedes ajustar este valor según tus necesidades

      // Desplazarse hacia abajo si es un dispositivo móvil
      if (isMobile) {
        window.scrollBy({
          top: 300, // Desplazarse 300 píxeles hacia abajo
          behavior: 'smooth' // Desplazamiento suave
        });
      }
      onCompletion(true);
    };
  
    const handleAddressPopupSubmit = (e) => {
        e.preventDefault();
        const newAddress = {
            street,
            doorNumber,
            apartment,
            department,
            postalCode,
            location,
        };
    
        if (editIndex !== null) {
            const updatedAddresses = addresses.map((address, index) =>
                index === editIndex ? newAddress : address
            );
            setAddresses(updatedAddresses);
        } else {
            setAddresses([...addresses, newAddress]);
            setSelectedAddressIndex(addresses.length);
        }
    
        setShowPopup(false);
        setEditIndex(null);
    };
  
    useEffect(() => {
        const geocodeAddress = () => {
            const address = `${street} ${doorNumber}, ${apartment ? apartment + ", " : ""}${department}, Uruguay`;
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address }, (results, status) => {
                if (status === "OK" && results[0]) {
                    setLocation({
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng(),
                    });
                }
            });
        };
    
        if (street && doorNumber && department) {
            geocodeAddress();
        }
    }, [street, doorNumber, apartment, department]);

    useEffect(() => {
      const savedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
      if (savedUserDetails) {
        setEmail(savedUserDetails.email);
        setFirstName(savedUserDetails.firstName);
        setLastName(savedUserDetails.lastName);
        setCountry(savedUserDetails.country);
        setDocumentType(savedUserDetails.documentType);
        setDocumentNumber(savedUserDetails.documentNumber);
        setPhone(savedUserDetails.phone);
        setTermsAccepted(savedUserDetails.termsAccepted);
        setFacturaConRUT(savedUserDetails.facturaConRUT);
        setRazonSocial(savedUserDetails.razonSocial);
        setRUT(savedUserDetails.rut);
        setRecipient(savedUserDetails.recipient);
        setAddresses([savedUserDetails.address]);
        setRemarks(savedUserDetails.remarks);
        setSelectedAddressIndex(0);
        setDeliveryType(savedUserDetails.deliveryType);
        setStep(5); // Salta directamente al resumen
      }
    }, []);
  
    return (
      <LoadScript googleMapsApiKey="AIzaSyAc8LWhTfVyDkEcnOWWM2Zd01JCFpO20T4">
        <WizardContainer>
          <ProgressBarContainer>
            <ProgressBar width={progress} />
          </ProgressBarContainer>
    
          <WizardStep active={step === 1}>
            <H3>Ingresa tu email</H3>
            <form onSubmit={handleEmailSubmit}>
              <WizardInput
                type="email"
                placeholder="Email"
                width="100%"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <ButtonContainer>
                <WizardButton type="submit">Siguiente</WizardButton>
              </ButtonContainer>
            </form>
          </WizardStep>
    
          <WizardStep active={step === 2}>
            <H3>DATOS DE FACTURACIÓN</H3>
            <form onSubmit={handleBillingSubmit}>
              <InlineContainer>
                <WizardInput
                  type="text"
                  placeholder="Nombre"
                  width="100%"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <WizardInput
                  type="text"
                  placeholder="Apellido"
                  width="100%"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </InlineContainer>
              <InlineContainer>
                <WizardInput
                  type="text"
                  placeholder="Pais de Origen"
                  width="100%"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
                <WizardSelect
                  width="100%"
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  required
                >
                  <option value="">Tipo de Documento</option>
                  <option value="ci">CI</option>
                  <option value="passport">Pasaporte</option>
                </WizardSelect>
              </InlineContainer>
              <WizardInput
                type="text"
                placeholder="Documento"
                width="100%"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                required
              />
              <WizardInput
                type="text"
                placeholder="Numero de Telefono"
                width="100%"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                ¿Factura con RUT?
                <input
                  type="checkbox"
                  checked={facturaConRUT}
                  onChange={(e) => setFacturaConRUT(e.target.checked)}
                />
              </label>
              {facturaConRUT && (
                <>
                  <WizardInput
                    type="text"
                    placeholder="Razón Social"
                    width="100%"
                    value={razonSocial}
                    onChange={(e) => setRazonSocial(e.target.value)}
                    required
                  />
                  <WizardInput
                    type="text"
                    placeholder="RUT"
                    width="100%"
                    value={rut}
                    onChange={(e) => setRUT(e.target.value)}
                    required
                  />
                </>
              )}
              <hr />
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                />
                Acepto términos y condiciones
              </label>
              <ButtonContainer>
                <WizardButton type="button" onClick={() => setStep(1)}>Atrás</WizardButton>
                <WizardButton type="submit">Siguiente</WizardButton>
              </ButtonContainer>
            </form>
          </WizardStep>
  
          <WizardStep active={step === 3}>
            <H3>SELECCIONA EL TIPO DE ENTREGA</H3>
            <ButtonContainer>
              <WizardButton type="button" onClick={() => handleDeliveryChoice('delivery')}>
                Envio a domicilio
              </WizardButton>
              <WizardButton type="button" onClick={() => handleDeliveryChoice('takeaway')}>
                Retirar en Local
              </WizardButton>
            </ButtonContainer>

            <ButtonContainer>
                <WizardButton type="button" onClick={() => setStep(2)}>Atrás</WizardButton>
            </ButtonContainer>

          </WizardStep>
    
          <WizardStep active={step === 4}>
            <H3>DATOS DE ENVÍO</H3>
            <form onSubmit={handleShippingSubmit}>
              <WizardInput
                type="text"
                placeholder="Nombre del destinatario"
                width="100%"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
              />
              <H4>Direcciones de Envío</H4>
              <WizardButton
                type="button"
                onClick={() => {
                  setStreet("");
                  setDoorNumber("");
                  setApartment("");
                  setDepartment("Montevideo");
                  setPostalCode("");
                  setLocation({ lat: -34.9011, lng: -56.1645 });
                  setShowPopup(true);
                }}
              >
                Agregar Dirección
              </WizardButton>
                  {addresses.map((address, index) => (
                  <AddressSummary key={index}>
                    <div>
                      {address?.street || "Calle no especificada"} {address?.doorNumber || ""}
                      {address?.apartment && `${address.apartment}, `}
                      {address?.department || "Departamento no especificado"}
                      {address?.postalCode || "Código postal no especificado"}
                    </div>
                    <div>
                      <IconButton onClick={() => handleEditAddress(index)}>
                        <FaEdit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteAddress(index)}>
                        <FaTrash />
                      </IconButton>
                    </div>
                  </AddressSummary>
                ))}
              <ButtonContainer>
                <WizardButton type="button" onClick={() => setStep(3)}>Atrás</WizardButton>
                <WizardButton type="button" disabled={addresses.length === 0} onClick={() => setStep(5)}>Siguiente</WizardButton>
              </ButtonContainer>
            </form>
          </WizardStep>
          
          <WizardStep active={step === 5}>
          <H3>RESUMEN</H3>
          <SummaryItem>
            <H4>Email:</H4> <SummaryText>{email}</SummaryText>
          </SummaryItem>
          <SummaryItem>
            <H4>Nombre:</H4> <SummaryText>{firstName} {lastName}</SummaryText>
          </SummaryItem>
          <SummaryItem>
            <H4>País de Origen:</H4> <SummaryText>{country}</SummaryText>
          </SummaryItem>
          <SummaryItem>
            <H4>Documento:</H4> <SummaryText>{documentType} - {documentNumber}</SummaryText>
          </SummaryItem>
          <SummaryItem>
            <H4>Teléfono:</H4> <SummaryText>{phone}</SummaryText>
          </SummaryItem>
          {facturaConRUT && (
            <>
              <SummaryItem>
                <H4>Razón Social:</H4> <SummaryText>{razonSocial}</SummaryText>
              </SummaryItem>
              <SummaryItem>
                <H4>RUT:</H4> <SummaryText>{rut}</SummaryText>
              </SummaryItem>
            </>
          )}

          {/* Tipo de Envío */}
          <SummaryItem>
            <H4>Tipo de Envío:</H4>
            <SummaryText>
              {deliveryType === 'takeaway' ? 'Para retirar' : 'Entrega a domicilio'}
            </SummaryText>
          </SummaryItem>

          {/* Mostrar destinatario solo si es entrega a domicilio */}
          {deliveryType === 'delivery' && (
            <>
              <SummaryItem>
                <H4>Destinatario:</H4> <SummaryText>{recipient}</SummaryText>
              </SummaryItem>
              {addresses[selectedAddressIndex] && (
                <SummaryItem>
                  <H4>Dirección de Envío:</H4>
                  <SummaryText>
                    {addresses[selectedAddressIndex].street} {addresses[selectedAddressIndex].doorNumber},
                    {addresses[selectedAddressIndex].apartment && ` ${addresses[selectedAddressIndex].apartment}, `}
                    {addresses[selectedAddressIndex].department}, {addresses[selectedAddressIndex].postalCode}
                  </SummaryText>
                </SummaryItem>
              )}
            </>
          )}

          <SummaryItem>
            <H4>Observaciones:</H4> <SummaryText>{remarks}</SummaryText>
          </SummaryItem>
          <ButtonContainer>
            <WizardButton type="button" onClick={() => setStep(deliveryType === 'takeaway' ? 3 : 4)}>Atrás</WizardButton>
            <WizardButton type="button" onClick={handleFinish}>Finalizar</WizardButton>
          </ButtonContainer>
        </WizardStep>

        </WizardContainer>
        
        {showPopup && (
          <>
            <Overlay onClick={() => setShowPopup(false)} />
            <PopupContainer>
              <H3>{editIndex !== null ? "Editar Dirección" : "Agregar Dirección"}</H3>
              <form onSubmit={handleAddressPopupSubmit}>
                <WizardInput
                  type="text"
                  placeholder="Calle"
                  width="100%"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
                <InlineContainer>
                  <WizardInput
                    type="text"
                    placeholder="Número de puerta"
                    width="100%"
                    value={doorNumber}
                    onChange={(e) => setDoorNumber(e.target.value)}
                    required
                  />
                  <WizardInput
                    type="text"
                    placeholder="Apartamento"
                    width="100%"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                  />
                </InlineContainer>
                <InlineContainer>
                  <WizardInput
                    type="text"
                    placeholder="Montevideo"
                    width="100%"
                    value="Montevideo"
                    onChange={(e) => setDepartment(e.target.value)}
                    readOnly
                    required
                  />
                  <WizardInput
                    type="text"
                    placeholder="Código Postal"
                    width="100%"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </InlineContainer>
                <MapContainer>
                  <MapOverlay isBlurred={isMapBlurred} onClick={handleMapClick}>
                    {isMapBlurred ? 'Haga clic para interactuar con el mapa' : ''}
                  </MapOverlay>
                  <GoogleMapStyled
                    center={location}
                    zoom={15}
                    onClick={(e) => setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                  >
                    <Marker position={location} />
                  </GoogleMapStyled>
                </MapContainer>
  
                <WizardInput
                  type="text"
                  placeholder="Observaciones"
                  width="100%"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
                <ButtonContainer>
                  <WizardButton type="button" onClick={() => setShowPopup(false)}>Cancelar</WizardButton>
                  <WizardButton type="submit">Guardar</WizardButton>
                </ButtonContainer>
              </form>
            </PopupContainer>
          </>
        )}
      </LoadScript>
    );
  };
  
  export default Wizard;