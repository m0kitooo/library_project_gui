import BasePageLayout from "../../components/BasePageLayout";
import DefaultForm from "../../components/DefaultForm/DefaultForm";
import useFetch from "../../hooks/useFetch";

export default function AddMember() {
  const { members } = useFetch();

  const handleSubmit = async (event) => {
    
  };

  return (
		<BasePageLayout>
			<DefaultForm onSubmit={handleSubmit}>
				<input type="text" name="name" placeholder="Imię" />
				<input type="text" name="surname" placeholder="Nazwisko" />
				<input type="date" placeholder="Data urodzenia" />
				<input type="text" inputMode="numeric" pattern="\\d{11}" maxLength={11} placeholder="Pesel" />
				<input type="email" placeholder="Email" />
				<button type="submit">Dodaj członka</button>
			</DefaultForm>
		</BasePageLayout>
	);
}