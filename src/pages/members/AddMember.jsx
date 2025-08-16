import BasePageLayout from "../../components/BasePageLayout";
import DefaultForm from "../../components/DefaultForm/DefaultForm";
import useFetchDynamic from "../../hooks/useFetchDynamic";
import { useRef } from "react";
import CORE_API_BASE_URL from "../../coreApiBaseUrl";

export default function AddMember() {
  const { data, loading, error, fetcher } = useFetchDynamic();
	const nameRef = useRef(null);
	const surnameRef = useRef(null);
	const birthdateRef = useRef(null);
	const peselRef = useRef(null);

  const handleSubmit = async () => {
    fetcher(`${CORE_API_BASE_URL}/members`, {
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
				<input ref={birthdateRef} type="date" placeholder="Data urodzenia" />
				<input ref={peselRef} type="text" inputMode="numeric" pattern="[0-9]{11}" maxLength={11} placeholder="Pesel" />
				{/* <input type="email" placeholder="Email" /> */}
				<button type="submit">Dodaj członka</button>
			</DefaultForm>
		</BasePageLayout>
	);
}