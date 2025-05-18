{doc.phone && (
  <p className="text-indigo-700 text-sm truncate break-words">
    <a href={`tel:${doc.phone}`} className="hover:underline">
      {doc.phone}
    </a>
  </p>
)}
