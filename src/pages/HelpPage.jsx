import { site } from '../config/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Accordion } from '../components/ui/Accordion'
import { Icon } from '../components/ui/Icon'
import { PageTitle } from '../components/ui/SectionHeading'
import { sizeChart } from '../data/content'
import { formatPrice } from '../lib/format'

const SECTIONS = [
  {
    id: 'shipping',
    title: 'Shipping',
    faqs: [
      ['How long does delivery take?', 'Orders are dispatched within 48 hours and delivered in 2 to 7 working days depending on your pincode.'],
      ['Is shipping free?', `Shipping is free on orders above ${formatPrice(site.freeShippingOver)}. Below that, a flat ${formatPrice(site.shippingFee)} applies.`],
      ['Do you offer cash on delivery?', `Yes, across India, with a ${formatPrice(site.codFee)} handling fee.`],
    ],
  },
  {
    id: 'returns',
    title: 'Returns & Exchange',
    faqs: [
      ['What is your return policy?', 'Unused pieces with tags can be returned or exchanged within 7 days of delivery. We arrange a free pickup.'],
      ['Can I exchange for a different size?', 'Yes. Size exchanges are free within 7 days. Request one from My orders and we pick up the old piece when we drop the new one.'],
      ['When will I get my refund?', 'Refunds reach your original payment method within 5 to 7 days of pickup. COD orders are refunded to your bank account or as store credit.'],
    ],
  },
  {
    id: 'care',
    title: 'Care',
    faqs: [
      ['How should I wash my Janniyor pieces?', 'Gentle wash cold, inside out, and dry in shade. Hand wash anything with mirror work or embroidery.'],
      ['Will the colour bleed?', 'Printed and ombre pieces may release a little colour in the first wash. Wash them separately in cold water.'],
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy',
    faqs: [['How do you use my data?', 'We only use your details to deliver your order and, if you opt in, to send you our newsletter. We never sell your data.']],
  },
]

export function HelpPage() {
  useDocumentTitle('Help')
  return (
    <div className="shell max-w-[900px] py-10 lg:py-14">
      <PageTitle title="Help" sub="Answers on sizing, delivery and returns. Still stuck? Message us." />

      <div id="contact" className="mt-10 grid scroll-mt-32 gap-3 sm:grid-cols-3">
        {[
          ['whatsapp', 'WhatsApp', site.phone, `https://wa.me/${site.phone.replace(/\D/g, '')}`],
          ['chat', 'Email', site.email, `mailto:${site.email}`],
          ['package', 'Track order', 'My orders', '/account'],
        ].map(([icon, title, body, href]) => (
          <a key={title} href={href} className="group rounded-[22px] bg-mist p-5 transition-colors hover:bg-marigold-soft">
            <span className="grid size-12 place-items-center rounded-full bg-chalk text-indigo transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-12 group-hover:scale-110"><Icon name={icon} size={24} /></span>
            <p className="mt-3 text-[16px] font-bold">{title}</p>
            <p className="text-[13px] text-ink-soft group-hover:text-ink">{body}</p>
          </a>
        ))}
      </div>

      <section id="sizing" className="mt-12 scroll-mt-40">
        <h2 className="display text-[30px] text-ink">Size guide</h2>
        <p className="mt-2 text-[15px] text-ink-soft">Body measurements in inches. Our fits are relaxed, so pick your usual size.</p>
        <table className="mt-4 w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-line text-[13px] text-ink-soft">
              {['Size', 'Bust', 'Waist', 'Hip'].map((h) => (
                <th key={h} className="py-2 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizeChart.map(([s, ...m]) => (
              <tr key={s} className="border-b border-line">
                <td className="py-2.5 font-medium">{s}</td>
                {m.map((v, i) => (
                  <td key={i} className="py-2.5 tabular-nums">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {SECTIONS.map((s) => (
        <section key={s.id} id={s.id} className="mt-12 scroll-mt-40">
          <h2 className="display text-[30px] text-ink">{s.title}</h2>
          <div className="mt-3 border-t border-line">
            {s.faqs.map(([q, a]) => (
              <Accordion key={q} title={q}>
                {a}
              </Accordion>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
