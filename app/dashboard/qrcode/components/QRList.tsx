import QRCard from './QRCard'

export default function QRList({ items }) {
  return items ? (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {items.map(item => (
        <QRCard key={item.id} item={item} />
      ))}
    </div>
  ) : (
    <p>no qr code...</p>
  )
}
