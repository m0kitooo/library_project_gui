import BasePageLayout from "../../components/BasePageLayout/BasePageLayout";
import DefaultForm from "../../components/DefaultForm/DefaultForm";
import useFetchDynamic from "../../hooks/useFetchDynamic";
import { useState, useRef, useEffect } from "react";
import CORE_API_BASE_URL from "../../coreApiBaseUrl";
import Toast from "../../components/Toast/Toast";

export default function AddMember() {
  const [toast, setToast] = useState(null);

  const { data, loading, error, fetcher } = useFetchDynamic();
	const nameRef = useRef(null);
	const surnameRef = useRef(null);
	const birthdateRef = useRef(null);
	const peselRef = useRef(null);

	useEffect(() => {
		if (error && data?.code === 'MEMBER_002') {
			alert('Członek z podanym peselem już istnieje');
		}
		if (data && !error) {
			setToast({ message: "Dodano członka!", id: Date.now() });
		}
	}, [data, error]);

  const handleSubmit = async () => {
    if (!nameRef.current.value || !surnameRef.current.value || !birthdateRef.current.value || !peselRef.current.value) {
      alert('Wszystkie pola są wymagane');
      return;
    }
		if (!/^\d{11}$/.test(peselRef.current.value)) {
			alert('Pesel musi mieć 11 cyfr');
			return;
		}

		const birthDate = new Date(birthdateRef.current.value);
		birthDate.setHours(0, 0, 0, 0);

		const minBirthDate = new Date();
		minBirthDate.setFullYear(minBirthDate.getFullYear() - 13);
		minBirthDate.setHours(0, 0, 0, 0);

		if (birthDate > minBirthDate) {
			alert('Użytkownik musi mieć co najmniej 13 lat');
			return;
		}

		const result = await fetcher(`${CORE_API_BASE_URL}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameRef.current.value,
        surname: surnameRef.current.value,
        pesel: peselRef.current.value,
        birthday: birthdateRef.current.value
      }),
      credentials: "include"
    });
  };

  return (
		<BasePageLayout>
			<DefaultForm onSubmit={handleSubmit}>
				<input ref={nameRef} type="text" name="name" placeholder="Imię" />
				<input ref={surnameRef} type="text" name="surname" placeholder="Nazwisko" />
				<input 
					ref={birthdateRef} 
					type="text"
					onFocus={e => e.target.type = 'date'}
  				onBlur={e => e.target.type = 'text'}
					placeholder="Data urodzenia" 
				/>
				<input ref={peselRef} type="text" inputMode="numeric" pattern="[0-9]{11}" maxLength={11} placeholder="Pesel" />
				<input placeholder="numer telefonu"></input>
				<input placeholder="adres"></input>
				<button type="submit" formNoValidate>Dodaj członka</button>
			</DefaultForm>
			{toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
		</BasePageLayout>
	);
}