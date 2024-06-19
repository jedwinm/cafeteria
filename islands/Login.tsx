import { useSignal } from "@preact/signals";

export default function Login() {
  const identification = useSignal("");
  const password = useSignal("");
  const showPassword = useSignal(false);

  const sendingData = useSignal(false);

  const submitForm = async (evt: Event) => {
    evt.preventDefault();
    sendingData.value = true;

    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        identification: identification.value,
        password: password.value,
      }),
      headers: {
        'Content-Type': 'application',
      }
    });

    const responseData = (await response.json()) as {ok: boolean};
    if (responseData.ok) {
      location.reload();
    }
    sendingData.value = false;
  };

  return (
    <form onSubmit={submitForm}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Identificación
        </label>
        <input
          type="identification"
          id="identification"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          value={identification}
          onChange={(e) => {
            identification.value =
              (e.target as HTMLInputElement | null)?.value ?? "";
          }}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-700 font-bold mb-2"
        >
          Contraseña
        </label>
        <input
          type={showPassword.value ? "text" : "password"}
          id="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          value={password}
          onChange={(e) => {
            password.value = (e.target as HTMLInputElement | null)?.value ?? "";
          }}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="showPassword"
          className="block text-gray-700 font-bold mb-2"
        >
          <input
            type="checkbox"
            name="showPassword"
            id="showPassword"
            checked={showPassword}
            onClick={() => {
              showPassword.value = !showPassword.value;
            }}
          />{" "}
          Mostrar contraseña
        </label>
      </div>
      <div className="flex items-center justify-between">
        <button
          disabled={sendingData}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Iniciar sesión
        </button>
      </div>
    </form>
  );
}
