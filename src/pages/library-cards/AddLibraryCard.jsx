export default function AddLibraryCard() {
  const [toast, setToast] = useState(null);

  const { data, loading, error, fetcher } = useFetchDynamic();
  const memberIdRef = useRef(null);

  const handleSubmit = async () => {
    fetcher(`${CORE_API_BASE_URL}/library-cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memberId: memberIdRef.current.value,
        bookId: bookIdRef.current.value,
        issueDate: issueDateRef.current.value,
        returnDate: returnDateRef.current.value
      }),
      credentials: "include"
    });
    if (!error)
      setToast({ message: "Dodano kartę biblioteczną!" });
  };

  return (
    <BasePageLayout>
      <DefaultForm onSubmit={handleSubmit}>
        <input ref={memberIdRef} type="text" name="memberId" placeholder="ID Członka" />
        <button type="submit">Dodaj Kartę Biblioteczną</button>
      </DefaultForm>
      {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
    </BasePageLayout>
  );
}