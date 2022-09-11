export const ACTIVITY_MSG = {
  add_organization: "A ajouté une association",
  request_organization: "A demandé à rejoindre une association",
  join_organization: "A rejoint une association",
  invite_organization_member: "A été invité à rejoindre une association",
  add_job: "A publié une mission",
  add_partner: "A ajouté un partenaire",
  add_discount: "A ajouté une réduction"
} as const;

export enum Activities {
  add_organization = "add_organization",
  request_organization = "request_organization",
  join_organization = "join_organization",
  invite_organization_member = "invite_organization_member",
  add_job = "add_job",
  add_partner = "add_partner",
  add_discount = "add_discount"
}

export const ACTIVITY_DATA = [
  {type: "join_organization", name: "Voir ensemble", members: "16", date: "14/03", time: "10:10", job_title: "Sauvegarder le patrimoine : RÉNOVER UN MONUMENT"},
  {type: "add_organization", name: "Voir ensemble", members: "16", date: "12/03", time: "12:10"}
] as const;