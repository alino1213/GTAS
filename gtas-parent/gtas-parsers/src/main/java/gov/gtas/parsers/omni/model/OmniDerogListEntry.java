/*
 * All GTAS code is Copyright 2020, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
 * Please see LICENSE.txt for details.
 */
package gov.gtas.parsers.omni.model;

public class OmniDerogListEntry extends OmniPassenger {
    private String derogId;

    public String getDerogId() {
        return derogId;
    }

    public void setDerogId(String derogId) {
        this.derogId = derogId;
    }
}
