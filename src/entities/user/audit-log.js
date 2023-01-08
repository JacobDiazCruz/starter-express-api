/**
 * @author Jacob
 * @description attach audit log to entity
 * @param - any entity
 * @returns - entity with audit log
 */
export default function makeAuditLog(entity) {
     let { dateCreated, createdBy, lastDateUpdated, lastUpdatedBy } = entity.auditLog || {}

     if (!dateCreated) dateCreated = new Date()
     else lastDateUpdated = new Date()

     return Object.freeze({ auditLog: { dateCreated, createdBy, lastDateUpdated, lastUpdatedBy }, ...entity })
}
