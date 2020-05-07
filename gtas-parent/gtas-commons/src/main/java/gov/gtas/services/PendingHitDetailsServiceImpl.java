package gov.gtas.services;

import gov.gtas.enumtype.HitTypeEnum;
import gov.gtas.model.HitMaker;
import gov.gtas.model.ManualHit;
import gov.gtas.model.PendingHitDetails;
import gov.gtas.model.User;
import gov.gtas.repository.HitMakerRepository;
import gov.gtas.repository.PendingHitDetailRepository;
import gov.gtas.services.security.UserService;
import org.elasticsearch.common.util.concurrent.PrioritizedEsThreadPoolExecutor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Set;

@Service
public class PendingHitDetailsServiceImpl implements PendingHitDetailsService {

    @Autowired
    PendingHitDetailRepository phr;

    @Autowired
    HitMakerRepository hmr;

    @Autowired
    UserService userService;

    @Autowired
    HitCategoryService hitCategoryService;

    //For generation of manual hits.
    @Override
    @Transactional
    public void createManualPendingHitDetail(Long paxId, Long flightId, String userId, Long hitCategoryId, String desc){
        User user = userService.fetchUser(userId);
        String title = "Manually Generated PVL";
        String ruleConditions = "N/A";
        Float percentageMatch = 1F;

        ManualHit mh = createManualHitMaker(null, user, hitCategoryId);
        hmr.save(mh);

        PendingHitDetails phd = createPendingHitDetails(paxId, flightId, userId, title, desc, ruleConditions, percentageMatch, mh);
        phr.save(phd);
    };

    @Override
    public PendingHitDetails createPendingHitDetails(Long paxId, Long flightId, String userId, String title,String desc,
                                                    String ruleConditions, Float percentageMatch, HitMaker hm){
        PendingHitDetails phd = new PendingHitDetails();
        phd.setTitle(title);
        phd.setDescription(desc);

        //HitMaker must exist for pending hit detail to function, the phd HitTypeEnum should match its Maker.
        phd.setHitEnum(hm.getHitTypeEnum());
        phd.setHitType(hm.getHitTypeEnum().toString());

        if(percentageMatch == null || percentageMatch.isNaN()){
            phd.setPercentage(1);
        } else {
            phd.setPercentage(percentageMatch);
        }
        phd.setRuleConditions(ruleConditions);
        phd.setPassengerId(paxId);
        phd.setFlightId(flightId);
        phd.setCreatedDate(new Date());
        phd.setCreatedBy(userId);
        phd.setHitMaker(hm);
        phd.setHitMakerId(hm.getId());

        return phd;
    }

    @Override
    public void saveAllPendingHitDetails(Set<PendingHitDetails> phdSet){
        phr.saveAll(phdSet);
    };

    private ManualHit createManualHitMaker(String desc, User user, Long hitCategoryId){
        //Manual hit hit maker must be present
        ManualHit mh = new ManualHit();
        if( desc == null || desc.isEmpty()){
            mh.setDescription("Generated Manual HitMaker");
        } else {
            mh.setDescription(desc);
        }
        mh.setAuthor(user);
        mh.setHitCategory(hitCategoryService.findById(hitCategoryId));

        return mh;
    }
}
