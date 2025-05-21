// InputError.jsx - Composant pour afficher les messages d'erreur des formulaires

const InputError = ({ message = '', className = '', ...props }) => {
    return message ? (
        <p {...props} className={`text-sm text-red-600 ${className}`}>
            {message}
        </p>
    ) : null;
};

export default InputError;
